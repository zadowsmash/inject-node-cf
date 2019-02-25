# inject-node-cf
Inject node.js functions into CloudFormation Templates

## Usage

* Place the **inject-node-cf** directory above your other directory that your node.js function lives in.
* Write your node.js function (must be named index.js) inside a directory named **EXACTLY** the same name as the logical name you have called it within your  **AWS::Lambda::Function** resource section witin your CF template. 


    In the example below the name is **functionName**

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

* Inside the **inject-node-cf** directory make a directory whatever you want to call your function. (ie build-infra)
* Insie the above mentioned directory (ie build-infra) you create, make your CF template and call it build-infra.template.json
* Oncd your function is ready to be inserted. cd into the **inject-node-cf**  directory and run command:

```

# node build.js build-infra

```

* You should receive an output as per the screenshot below:

![Example](https://s3-ap-southeast-2.amazonaws.com/760584908251-public/github_pictures/inject-node-cf.png)


Thanks to: 

[@chriscoombs!](https://github.com/chriscoombs)

@hbwork: https://github.com/hbwork

