/** @param {NS} ns **/
export async function main(ns) {
  const ram = 8

  let idx = 0
  while (idx < ns.getPurchasedServerLimit()) {
    if (ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(ram)) {
      const hostname = ns.purchaseServer(`hotbox-${idx}`, ram)

      ns.exec('bootstrap.js', 'home', 1)

      idx++
    }

    await ns.sleep(1000)
  }
}
