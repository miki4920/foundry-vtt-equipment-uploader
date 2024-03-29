# FoundryVTT Equipment Uploader

## Description
The FoundryVTT Equipment Uploader is a client-side module for Foundry Virtual Tabletop (VTT) that enables you to upload equipment data of your party directly into a DynamoDB database. This tool makes it easier for GMs and players to keep track of equipment changes and inventories, providing an efficient mechanism to persist and retrieve the data. This module works with FoundryVTT 0.9.x and above.

## Features
- Easy inventory management: Quickly upload and view your party's equipment data.
- Seamless integration: Directly interacts with your DynamoDB database for real-time updates.

## Requirements
- Foundry VTT 0.9.x or above
- AWS account and access to DynamoDB
- Pathfinder 2E system

## Installation
1. Install Foundry VTT according to the official Foundry VTT documentation.
2. Inside Foundry VTT, navigate to the Add-on Modules option.
3. Click Install Module and in the Manifest URL, paste the following link: [Manifest URL](https://github.com/miki4920/foundry-vtt-equipment-uploader/releases/latest/download/module.json)
4. After the installation is complete, enable the FoundryVTT Equipment Uploader module in the module settings of Foundry VTT.

## Configuration
1. Access the settings menu for the module in Foundry VTT.
2. Input your AWS credentials (Access Key ID and Secret Access Key) in the relevant fields.
3. Save the configuration.

Please note: Never share your AWS credentials with anyone. Follow AWS security best practices. It is strongly recommended to use IAM roles with restricted permissions for this module.

## Usage
1. The module will automatically upload data to Dynamodb when a change to inventory is made.

## Support
If you have any issues or feature requests, please file them in the [GitHub issues](https://github.com/miki4920/foundry-vtt-equipment-uploader/issues) for this repository. 

## License
This project is licensed under the [MIT License](LICENSE). 
