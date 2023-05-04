resource "azurerm_container_registry" "container_register" {
   
   name = "istore_containerregister" 
   resource_group_name =  azurerm_resource_group.istoreresoucegroup
   location = "westus"
   admin_enabled = true 
   sku = "Basic"
}

output "containerhostname" {
  
  value = azurerm_container_registry.container_register.login_server
}

output "containerusername" {
  
  value = azurerm_container_registry.container_register.admin_username
}

output "containerpassword" {
  value =  azurerm_container_registry.container_register.admin_password
}