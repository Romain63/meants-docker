import { SensorGuard } from './sensor-guard';
import { SensorCreateGuard } from './sensor-create-guard';
import { SensorUpdateGuard } from './sensor-update-guard';
import { SensorDeleteGuard } from './sensor-delete-guard';

export const USERS_GUARD_PROVIDERS = [
  SensorGuard,
  SensorCreateGuard,
  SensorUpdateGuard,
  SensorDeleteGuard
];

export {
  SensorGuard,
  SensorCreateGuard,
  SensorUpdateGuard,
  SensorDeleteGuard
};
