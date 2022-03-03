This is an example nextjs app which uses thirdweb SDK to gate access to your [gather.town](https://gather.town) space to only those people who have a particular NFT. 


# Installation
You can use the [create-thirdweb-app cli](https://www.npmjs.com/package/create-thirdweb-app) to clone and set up the project for you. Make sure you have node installed on your system and try:

```npx create-thirdweb-app```

And select the following options:
1. NextJs
2. Bundle
3. gather.town


Once the project is set up locally, copy the `.env.example` file into `.env` and add the values to it.


| Variable | Description | Website |
|---|---|---|
| GATHER_API_KEY | Your gather API key | [Gather docs](https://www.notion.so/Gather-HTTP-API-3bbf6c59325f40aca7ef5ce14c677444) |
| GATHER_SPACE_ID | ID of the space you want to give access to | [gather.town](https://gather.town) |
| EDITION_ADDRESS | Address of the thirdweb bundle module | [thirdweb](https://thirdweb.com) |
| TOKEN_ID | Token ID of the NFT you want to check for | [thirdweb](https://thirdweb.com) |
| ALCHEMY_RPC | RPC URL | [Alchemy](https://www.alchemy.com/) | 


# Usage
To run it locally and make changes to it run:
```yarn dev```


# Contribution
Feel free to open pull requets or issues to request changes.