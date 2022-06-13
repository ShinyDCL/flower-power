import { Bucket } from './pond/bucket';

interface IUserState {
  pickedUpBucket: Bucket | null;
}
export const userState: IUserState = {
  pickedUpBucket: null,
};
