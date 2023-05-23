locals {
  service_name  = "store-auth" 
  login_server =  azurerm_container_registry.container_register.login_server
  username =  azurerm_container_registry.container_register.admin_username
  password = azurerm_container_registry.container_register.admin_password

  image_tag = "${local.login_server}/${local.service_name}:${var.app_version}"
}


resource "null_resource" "dockerbuild" {

 triggers = {
         
         always_run  = timestamp()
 }

 provisioner "local-exec" {
    command = "docker build -t ${local.image_tag} --file ../${local.service_name}/Dockerfile ../${local.service_name}"
   
 }

  

}

resource "null_resource" "docker_login" {

    depends_on = [ null_resource.dockerbuild ]

    triggers = {
      always_run=  timestamp() 
    }

    provisioner "local-exec" {

        command = "docker login ${local.login_server} --username ${local.username} --password ${local.password}"
      
    }

    
  
}


resource "null_resource" "docker_push" {
  depends_on = [ null_resource.docker_login ]

  triggers = {
    always_run =  timestamp()
  }

  provisioner "local-exec" {

    command = "docker push ${local.image_tag}"
    
  }
}

locals {
  dockercreds = {
    auths ={
        "${local.login_server}" ={
            auth = base64encode("${local.username}:${local.password}")
        }
    }
  }
}

resource  "kubernetes_secret" "docker_credentials" {

    metadata {
      name = "docker-credentials"
    }

    data = {
      ".dockerconfigjson"=  jsonencode(local.dockercreds)
    }
  
  type = "kubernetes.io/dockerconfigjson"
}


resource "kubernetes_deployment" "service_deployment" {

    depends_on = [ null_resource.docker_push ]

    metadata {
        name = local.service_name

    labels = {
            pod = local.service_name
        }
    }

    spec {
        replicas = 1

        selector {
            match_labels = {
                pod = local.service_name
            }
        }

        template {
            metadata {
                labels = {
                    pod = local.service_name
                }
            }

            spec {
                container {
                    image = local.image_tag
                    name  = local.service_name
#  env {
#            name = "SECRET"
#            value_from {
#              secret_key_ref {
#                name ="secret"
#                 key = "secret"
        
#              }

env_from {
  secret_ref {
    name = kubernetes_secret.mysecret.metadata[0].name 
  }
}
             
#            }
#           }

#           env{
#             name = "MONGO_URI" 
#          value_from {
#            secret_key_ref {
#              name ="mongouri"
#              key = "mongo_uri"
#            }
#          } 
         
#           }

#             env {
#               name = "JWT_SECRET" 
#               value_from {
#                 secret_key_ref {
#                   name  = "jwt"
#                 key = "jwt_key"
#                 }
#               }
#             }
          env {
            name = "AMQP_URI"
            value = "amqp://rabbit.default:5672"
          }
                  
                }

                image_pull_secrets {
                    name = kubernetes_secret.docker_credentials.metadata[0].name
                }
            }
        }
    }
}


# resource "kubernetes_deployment" "service_deployment" {
  
#   depends_on = [ null_resource.docker_push ]

#   metadata {
#     name =  local.service_name

#     labels = {
#       pods = local.service_name
#     }
#   }

#   spec {
#     replicas =  1 

#     selector {
#       match_labels = {
#         pod = local.service_name
#       }
#     }

#     template {
#       metadata {
#         labels = {
#             pod= local.service_name
#         }
#       }

#       spec {
#         container {
#           image = local.image_tag
#           name = local.service_name
        
#           env {
#            name = "SECRET"
#            value_from {
#              secret_key_ref {
#                name ="secret"
#                 key = "secret"
        
#              }
             
#            }
#           }

#           env{
#             name = "MONGO_URI" 
#          value_from {
#            secret_key_ref {
#              name ="mongouri"
#              key = "mongo_uri"
#            }
#          }
#           }

#             env {
#               name = "JWT_SECRET" 
#               value_from {
#                 secret_key_ref {
#                   name  = "jwt"
#                 key = "jwt_key"
#                 }
#               }
#             }
#           env {
#             name = "AMQP_URI"
#             value = "amqp://rabbit.default:5672"
#           }
#         }

#         image_pull_secrets {
#           name = kubernetes_secret.docker_credentials.metadata[0].name
#         }
#       }
#     }
#   }
# }

resource "kubernetes_service" "service" {

    metadata {
      name = local.service_name
    }

    spec {
      selector = {
        pod = kubernetes_deployment.service_deployment.metadata[0].labels.pod
      }

      session_affinity = "ClientIP"

      port {
        port =3000
        target_port = 3000
      }
    
    }

   
  
}