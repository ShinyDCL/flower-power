import { Bucket } from './bucket';
import { Inventory } from './inventory';

interface IUserState {
  pickedUpBucket: Bucket | null;
}
export const userState: IUserState = {
  pickedUpBucket: null,
};

export const inventory = new Inventory();
