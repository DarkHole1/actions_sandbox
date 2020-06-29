import React from 'react';

import SelectNext from './Misc/SelectNext.js';

import VKTargeting from './VK/Targeting.js';
import TikTokTargeting from './TikTok/Targeting.js';
import OKTargeting from './OK/Targeting.js';
import InstagramTargeting from './Instagram/Targeting.js';
import YouTubeTargeting from './YouTube/Targeting.js';

const TASK_TARGETS_LIST = [
  {title: 'VK', view: VKTargeting},
  {title: 'Odnoklassniki.ru', view: OKTargeting},
  {title: 'Instagram', view: InstagramTargeting},
  {title: 'Tik-Tok', view: TikTokTargeting},
  {title: 'YouTube', view: YouTubeTargeting},
];
const views = TASK_TARGETS_LIST.map(x => x.view);
const titles = TASK_TARGETS_LIST.map(x => x.title);

function TargetingSelector(props) {
  return (
    <SelectNext {...props} name="taskTarget" titles={titles} views={views} />
  );
}

export default TargetingSelector;
