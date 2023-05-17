# FoundryVTT Equipment Uploader

## Description
The FoundryVTT Equipment Uploader is a client-side module for Foundry Virtual Tabletop (VTT) that enables you to upload equipment data of your party directly into a DynamoDB database. This tool makes it easier for GMs and players to keep track of equipment changes and inventories, providing an efficient mechanism to persist and retrieve the data. This module works with FoundryVTT 0.9.x and above.

## Features
- Easy inventory management: Quickly upload and view your party's equipment data.
- Seamless integration: Directly interacts with your DynamoDB database for real-time updates.

## Requirements
- Foundry VTT 0.9.x or above
- AWS account and access to DynamoDB

## Installation
1. Install Foundry VTT according to the official Foundry VTT documentation.
2. Inside Foundry VTT, navigate to the Add-on Modules option.
3. Click Install Module and in the Manifest URL, paste the following link: `[Manifest URL]`
4. After the installation is complete, enable the FoundryVTT Equipment Uploader module in the module settings of Foundry VTT.

## Configuration
1. Access the settings menu for the module in Foundry VTT.
2. Input your AWS credentials (Access Key ID and Secret Access Key) in the relevant fields.
3. Input your DynamoDB table name where the equipment data will be stored.
4. Save the configuration.

Please note: Never share your AWS credentials with anyone. Follow AWS security best practices. It is strongly recommended to use IAM roles with restricted permissions for this module.

## Usage
1. Open your party's character sheet.
2. Navigate to the Equipment section.
3. Click on the "Upload to DynamoDB" button to upload the current equipment data.
4. The module will return a confirmation message upon successful upload.

## Support
If you have any issues or feature requests, please file them in the [GitHub issues](https://github.com/miki4920/foundry-vtt-equipment-uploader/issues) for this repository. 

## License
This project is licensed under the [MIT License](LICENSE). 
