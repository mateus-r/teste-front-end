import { youtubeApi } from "../../api";
import * as Observable from 'rxjs';

// export interface SearchResponse {
//     nextPageToken: string;
//     prevPageToken: string;
//     totalResults: number;
//     resultsPerPage: number;
//     items: SearchResource[];
// }

// export interface SearchResource {

// }

export function search(searchText: string, pageToken?: string) {
    return Observable.defer(() => doSearch(searchText, pageToken)).toPromise();
}

async function doSearch(searchTerm: string, pageToken?: string) {
    const result = await youtubeApi.get('/search', {
        params: {
            part: 'id,snippet',
            maxResults: 12,
            q: searchTerm,
            type: 'video',
            pageToken: pageToken,
        }
    });
    return result;
    // return result.data.map((r: SearchResponse) => {
    //     nextPageToken: r.nextPageToken,
    //     prevPageToken: r.prevPageToken,
    //     totalResults: r.pageInfo.totalResults,
    //     resultsPerPage: r.pageInfo.resultsPerPage,
    //     items: r.items,
    // }) as SearchResponse;
}

export function loadDetails(videoId: string) {
    return Observable.defer(() => doLoadDetails(videoId)).toPromise();
}

async function doLoadDetails(videoId: string) {
    const result = await youtubeApi.get('/videos', {
        params: {
            id: videoId,
            part: 'snippet,statistics',
        }
    });
    return result;
}