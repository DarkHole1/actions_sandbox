import React from 'react';

import SelectNext from './Misc/SelectNext.js';

import YTCrops from './YouTube/Crops.js';
import VKCrops from './VK/Crops.js';
import TikTokCrops from './TikTok/Crops.js';
import InstagramCrops from './Instagram/Crops.js';
import OKCrops from './OK/Crops.js';

const TASK_TARGETS_LIST = [
  {title: 'VK', view: VKCrops},
  {title: 'Odnoklassniki.ru', view: OKCrops},
  {title: 'Instagram', view: InstagramCrops},
  {title: 'Tik-Tok', view: TikTokCrops},
  {title: 'YouTube', view: YTCrops},
];
const views = TASK_TARGETS_LIST.map(x => x.view);
const titles = TASK_TARGETS_LIST.map(x => x.title);

function CropsSelector(props) {
  return (
    <SelectNext {...props} name="taskTarget" titles={titles} views={views} />
  );
}

export default CropsSelector;
