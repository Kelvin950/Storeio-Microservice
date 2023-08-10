terraform {
  backend "azurerm" {
    
    resource_group_name = "kelvinstre"
    storage_account_name = "kelvinstorage"
    container_name = "terraform-container"
    key = "terraform.tfstate"
  }
}