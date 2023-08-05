import {atom} from 'recoil';

/*export interface artistId {
    id: string;
}*/

export const trackIdsState = atom({
    key: 'trackIdsState',
    default: [] as string[],
});