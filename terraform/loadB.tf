resource "helm_release" "nginx-ingress-controller" {
  name       = "nginx-ingress-controller"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "nginx-ingress-controller"


  set {
    name  = "service.type"
    value = "LoadBalancer"
  }

}


resource "kubernetes_ingress" "ingresssrv" {

    wait_for_loadbalancer =true 

    metadata {
      name = "ingresssrv"
      annotations = {
        "kubernetes.io/ingress.class" ="nginx"
        "nginx.ingress.kubernetes.io/use-regex" ="true"
      }
    }

   spec {
    ingress_class_name = "nginx" 

    rule {
        
      http {
        path {
          backend {
            service_name = kubernetes_service.service.metadata[0].name
            service_port = 3000
            
             
          }
          path = "/api/users/?(.*)"
          
        }
       
      }
    }
   }
  
}