import {atom} from 'recoil';

/*export interface artistId {
    id: string;
}*/

export const artistIdsState = atom({
    key: 'artistIdsState',
    default: [] as string[],
});