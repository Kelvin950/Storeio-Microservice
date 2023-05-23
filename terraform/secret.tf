
resource "kubernetes_secret" "mysecret" {

    metadata {
      name = "mysecret"
    }


 data = {
   "SECRET" = base64encode(var.secret) 
    "JWT_SECRET" = base64encode(var.JWT_SECRET)
    "MONGO_URI" = base64encode(var.MONGO_URI) 
}
  
}