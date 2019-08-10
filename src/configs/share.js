import { basic as projectBasic } from './projects';
import { basic as newsBasic } from './news';
import { basic as memberBasic } from './members';
import { basic as courseBasic } from './courses';
import { basic as contactBasic } from './contact';
import { basic as labIntoBasic } from './labIntro';


export const formLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 12, offset: 1 }
};

export const pagesConfig = [
  projectBasic,
  newsBasic,
  memberBasic,
  courseBasic,
  contactBasic,
  labIntoBasic
];