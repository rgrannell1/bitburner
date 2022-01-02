function getTarget (host) {
  if (!isEnemy(host)) {
    return 'harakiri-sushi'
  } else {
    return host
  }
}

function isEnemy (host) {
  return !host.includes('hotbox')
}

/** @param {NS} ns 
 * 
 * copy files to all specified targets
 * 
 * **/
export async function main(ns) {
  const targets = [
    "n00dles",
    "sigma-cosmetics",
    "joesguns",
    "nectar-net",
    "hong-fang-tea",
    "harakiri-sushi",
    "CSEC",
    "hotbox-0",
    "hotbox-0-0",
    "hotbox-0-1",
    "hotbox-0-2",
    "hotbox-0-3"
  ]

  const files = ns.ls('home', 'js')

  // copy everything across
  for (const target of targets) {
    // compromise
    
    if (isEnemy(target)) {
      ns.nuke(target)
    }

    if (isEnemy(target) && ns.fileExists('BruteSSH.exe', 'home')) {
      ns.brutessh(target)
    }

    if (!ns.hasRootAccess(target)) {
      ns.print(`Ró: ${target} not compromised`)
      continue
    }

    for (const file of files) {
      await ns.scp(file, target)
    }

    ns.killall(target)

    // start script; tell each server to hack itself with a maximal number of threads
    for (let threads = 10; threads > 0; --threads) {
      const pid = ns.exec('general.js', target, threads, getTarget(target))

      if (pid != 0) {
        ns.print(`Ró: ${target} running with ${threads} threads`)
        break
      }
    }

    ns.print(`Ró: ${target} compromised and bootstrapped`)
  }
}
