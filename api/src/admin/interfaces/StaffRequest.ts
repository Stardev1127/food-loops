import IStaff from '../../shared/interfaces/IStaff';
import { IRequest } from '../../shared/interfaces/IRequest';

export interface StaffRequest extends IRequest {
  user?: IStaff;
}
