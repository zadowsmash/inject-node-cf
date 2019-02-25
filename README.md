# inject-node-cf
Inject node.js functions into CloudFormation Temaplates

## Usage

* Place the **inject-node-cf** directory above your other directory that your node.js function is.
* Write your node.js function (must be named index.js) inside a directory names **EXACTLY** the same name as the logical name you have called it within your  **AWS::Lambda::Function** resource. In the example below the name is **functionName**

```

        "functionName": {
            "Type": "AWS::Lambda::Function",
            "Properties": {
                "Code": {
                    
                    build.js will insert your node.js function here
                },
                "Handler": "index.handler",
                "MemorySize": "256",
                "Timeout": "300",
                "Role": {
                    "Fn::GetAtt": [
                        "LambdaRole",
                        "Arn"
                    ]
                },
                "Runtime": "nodejs8.10",
                "Environment": {
                    "Variables": {
                        "somevar": {
                            "Ref": "var"
                        }
                    }
                }
            }
        },

```


Thanks to: 
chriscoombs https://github.com/chriscoombs
Eric Ho https://github.com/hbwork

