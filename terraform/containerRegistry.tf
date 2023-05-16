resource "azurerm_container_registry" "container_register" {
   
   name = var.name 
   resource_group_name =  azurerm_resource_group.istoreresoucegroup.name
   location = var.location
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
  sensitive = true
}