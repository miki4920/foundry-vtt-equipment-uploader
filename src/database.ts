export function createDatabase(AWS, ddb) {
    const waiter = new AWS.ResourceWaiter(ddb, 'tableExists')
    const characters = {
        TableName: 'characters',
        KeySchema: [
            {
                'AttributeName': 'id',
                'KeyType': 'HASH'
            },
        ],
        AttributeDefinitions: [
            {
                'AttributeName': 'id',
                'AttributeType': 'S'
            },
        ],
        ProvisionedThroughput: {
            'ReadCapacityUnits': 1,
            'WriteCapacityUnits': 1
        }
    };
    ddb.createTable(characters,function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Table Created", data);
        }
    })
    waiter.wait({TableName: 'characters'})

    const items = {
            TableName: 'items',
            KeySchema: [
                {
                    'AttributeName': 'id',
                    'KeyType': 'HASH'
                },
            ],
            AttributeDefinitions: [
                {
                    'AttributeName': 'id',
                    'AttributeType': 'S'
                },
            ],
            ProvisionedThroughput: {
                'ReadCapacityUnits': 20,
                'WriteCapacityUnits': 20
            }
    }

    ddb.createTable(items, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Table Created", data);
        }
    })
    waiter.wait({TableName: 'items'})
}

export async function truncateTable(tableName, AWS) {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const getAllRecords = async (table) => {
        let params = {
            TableName: table,
        };
        let items = [];
        let data = await docClient.scan(params).promise();
        // @ts-ignore
        items = [...items, ...data.Items];
        while (typeof data.LastEvaluatedKey != "undefined") {
            // @ts-ignore
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            data = await docClient.scan(params).promise();
            // @ts-ignore
            items = [...items, ...data.Items];
        }
        return items;
    };
    const deleteItem = (table, id) => {
        var params = {
            TableName: table,
            Key: {
                id: id,
            },
        };

        return new Promise(function (resolve, reject) {
            docClient.delete(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    // @ts-ignore
                    resolve();
                }
            });
        });
    };

    async function deleteTable(tableName) {
        const allRecords = await getAllRecords(tableName);
        for (const item of allRecords) {
            // @ts-ignore
            await deleteItem(tableName, item.id);
        }
    }

    await deleteTable(tableName)
}




