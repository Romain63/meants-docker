import { RightsBase } from './RightsBase';
import { Right } from './decorators';

/** Represents the Users rights */
@Right('USER') export class UserRights extends RightsBase { };

/** Represents the Languages rights */
@Right('LANGUAGE') export class LanguageRights extends RightsBase { };

@Right('SENSOR') export class SensorRights extends RightsBase { };

@Right('MEASURE') export class MeasureRights extends RightsBase { };

@Right('DATAS') export class DatasRights extends RightsBase { };


/** Represents the Languages Resources rights */
@Right('LANGUAGE_RESOURCE') export class LanguageResourceRights extends RightsBase { };


/** Represents the Dashboard rights */
export class DashboardRights {
  static get ALL() {
    return ['R_ADM_DASHBOARD'];
  }
};
