const { ethers } = require("hardhat")
const hre = require("hardhat")

async function main() {
    const [deployer] = await hre.ethers.getSigners()
    console.log("Deployer: ", deployer);
    console.log("Deploying contract with the account: ", deployer.address);

    const TokenERC20 = await ethers.getContractFactory("CITToken")
    const tokenerc20 = await TokenERC20.deploy("Crystal ERC20 TomIvor Token", "CETT")

    console.log("Token ERC20 deployed to: ", tokenerc20.address)
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })