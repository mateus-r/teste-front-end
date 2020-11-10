import * as Observable from 'rxjs';
import { youtubeApi } from "../../api";

export interface SearchListResponse {
    nextPageToken?: string;
    items: SearchResult[];
}

export interface SearchResult {
    videoId: string;
    title: string;
    channelTitle: string;
    description: string;
}

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
    return {
        nextPageToken: result.data.nextPageToken,
        items: result.data.items.map((r: any) => {
            return {
                videoId: r.id.videoId,
                title: r.snippet.title,
                channelTitle: r.snippet.channelTitle,
                description: r.snippet.description,
            } as SearchResult
        }) as SearchResult[],
    } as SearchListResponse;
}