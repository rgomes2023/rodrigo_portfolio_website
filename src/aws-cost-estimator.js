/* ============================================
   AWS COST ESTIMATOR - LOGIC
============================================ */

const ec2Type = document.getElementById("ec2-type");
const ec2Hours = document.getElementById("ec2-hours");
const s3GB = document.getElementById("s3-gb");
const transferGB = document.getElementById("transfer-gb");
const natCount = document.getElementById("nat-count");
const albCount = document.getElementById("alb-count");

const ec2CostEl = document.getElementById("ec2-cost");
const s3CostEl = document.getElementById("s3-cost");
const transferCostEl = document.getElementById("transfer-cost");
const infraCostEl = document.getElementById("infra-cost");
const totalCostEl = document.getElementById("total-cost");

// Pricing (USD)
const S3_PRICE_PER_GB = 0.023;
const TRANSFER_PRICE_PER_GB = 0.09;
const NAT_PRICE = 32; // per gateway
// ALB already baked into select value in HTML

function calculate() {
    /* EC2 */
    const ec2 = Number(ec2Type.value) * Number(ec2Hours.value);
    ec2CostEl.textContent = `$${ec2.toFixed(2)}`;

    /* S3 */
    const s3 = Number(s3GB.value) * S3_PRICE_PER_GB;
    s3CostEl.textContent = `$${s3.toFixed(2)}`;

    /* Data Transfer */
    const transfer = Number(transferGB.value) * TRANSFER_PRICE_PER_GB;
    transferCostEl.textContent = `$${transfer.toFixed(2)}`;

    /* NAT + ALB */
    const nat = Number(natCount.value) * NAT_PRICE;
    const alb = Number(albCount.value);
    const infra = nat + alb;
    infraCostEl.textContent = `$${infra.toFixed(2)}`;

    /* TOTAL */
    const total = ec2 + s3 + transfer + infra;
    totalCostEl.textContent = `$${total.toFixed(2)}`;
}

// Trigger calculation on change
document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", calculate);
});

calculate();
