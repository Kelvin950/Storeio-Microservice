resource "helm_release" "nginx-ingress-controller" {
 name       = "nginx-ingress-controller"

  repository = "https://charts.bitnami.com/bitnami"
  chart      = "nginx-ingress-controller"


  set {
    name  = "controller.service.type"
    value = "LoadBalancer"
  }

}



 
  
resource "kubernetes_ingress_v1" "ingresssrv" {

   

    metadata {
      name = "ingresssrv"
     
    }

   spec {
   ingress_class_name = "nginx"

    rule {
        
      http {
        path {
          
         
          backend {
            service {
             name = "store-auth"
              port {

            number   = 3000
            }
            }
           
            
             
          }
          path = "/api/users/*"
          
        }
       
      }
    }
   }
  
}