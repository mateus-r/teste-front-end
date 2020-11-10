import { youtubeApi } from "../../api";
import * as Observable from 'rxjs';

export interface VideoListResponse {
    id: string;
    publishedAt: string;
    title: string;
    description: string;
    channelTitle: string;
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
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
    
    return {
        id: result.data.items[0].id,
        publishedAt: result.data.items[0].snippet.publishedAt,
        title: result.data.items[0].snippet.title,
        description: result.data.items[0].snippet.description,
        channelTitle: result.data.items[0].snippet.channelTitle,
        viewCount: result.data.items[0].statistics.viewCount,
        likeCount: result.data.items[0].statistics.likeCount,
        dislikeCount: result.data.items[0].statistics.dislikeCount,
    } as VideoListResponse;
}