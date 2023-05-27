import HomeControlOrigin from '../constants/homeControlOrigin';

function getMagentaHomeInfo(home) {
  return {
    id: home.id,
    label: home.info.label,
    origin: HomeControlOrigin.Magenta,
  };
}

function getSolidmationHomeInfo(home) {
  return {
    id: home.HomeID,
    label: home.Description,
    origin: HomeControlOrigin.Solidmation,
  };
}

export function processSolidmationHomes({ magenta_homes, pairings, solidmation_homes }) {
  const result = {};

  result.magenta_homes = magenta_homes.map(getMagentaHomeInfo);

  result.solidmation_homes = solidmation_homes.map(getSolidmationHomeInfo);

  result.pairings = pairings.map(homes => ({
    magenta_home: getMagentaHomeInfo(homes.magenta_home),
    solidmation_home: getSolidmationHomeInfo(homes.solidmation_home),
  }));

  return result;
}

export default {
  processSolidmationHomes,
};
