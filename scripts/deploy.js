const hre = require("hardhat");

async function main(){
    const Calculator = await hre.ethers.getContractFactory("Calculator");
    const cal = await Calculator.deploy()

    await cal.waitForDeployment();
    console.log(`deploy to ${await cal.getAddress()}`);
}

main().catch((error)=>{
    console.error(error);
    process.exitCode = 1;
});