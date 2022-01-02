export function showStatus (ns, host, targets) {
  const currSecurity = ns.getServerSecurityLevel(host)
  const currMoneyProduction = ns.getServerMoneyAvailable(host)

  ns.print(`\nRó: host: ${host} |\n security: ${currSecurity} (tgt: ${targets.security}) |\n money: ${currMoneyProduction} (tgt: ${targets.money})\n`)
}

export function getThresholds (ns, host) {
  const money = ns.getServerMaxMoney(host) * 0.5
  const security = ns.getServerMinSecurityLevel(host) + 10

  // -- get security from server object

  return {
    money,
    security
  }
}

export async function harvestHost(ns, host) {
  const targets = getThresholds(ns, host)

  showStatus(ns, host, targets)

  while (true) {
    const currSecurity = ns.getServerSecurityLevel(host)
    const currMoneyProduction = ns.getServerMoneyAvailable(host)
    
    showStatus(ns, host, targets)

    if (currSecurity > targets.security) {
      ns.print(`\nRó: too strong, weakening`)

      await ns.weaken(host)
    } else if (currMoneyProduction < targets.money) {
      ns.print(`\nRó: not productive, growing`)

      await ns.grow(host)
    } else {
      ns.print(`\nRó: hacking`)

      await ns.hack(host)
    }
  }   
}

/** @param {NS} ns **/
export async function main(ns) {
  await harvestHost(ns, ns.args[0])
}
