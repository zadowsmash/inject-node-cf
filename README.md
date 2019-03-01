# inject-node-cf
Inject node.js functions into CloudFormation Templates

## Usage

* Place the **inject-node-cf** directory outside the other directory that your node.js function lives in.
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

* Inside the **inject-node-cf** directory, cd into the **Projects** directory.
* Create a directory named whatever you want to call your CF template (ie. cf-infra).
* Inside the above mentioned directory you just created, place youf CF template there and it must have **.template.json** appended to the name (ie cf-infra.template.json) 
* Once your function is ready to be inserted. cd into the **inject-node-cf/Projects**  directory and run command:

```

# node build.js build-infra

```

* You should receive an output as per the screenshot below:

![Example](https://s3-ap-southeast-2.amazonaws.com/760584908251-public/github_pictures/inject-node-cf.png)


### All Credit for this build script goes to my friends:

[@chriscoombs](https://github.com/chriscoombs)

[@hbwork](https://github.com/hbwork)

