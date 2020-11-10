import { Col, message, Row, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { thumbnailApi } from '../../api';
import { ErrorMessage } from '../../components/ErrorMessage';
import { search, SearchListResponse } from './actions';
import './styles.css';

export const SearchResults = () => {

    interface ParamTypes { 
        q: string
    }
    const { q } = useParams<ParamTypes>();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [loadingNextPage, setLoadingNextPage] = React.useState<boolean>(false);
    const [result, setResult] = React.useState<SearchListResponse>();

    React.useEffect(() => {
        setLoading(true);
        search(q)
        .then((res) => {
            setResult(res);
        })
        .catch((err) => {
            message.error("Erro");
        })
        .finally(() => {
            setLoading(false);
        })
    }, [q]);

    const handleNextPage = () => {
        setLoadingNextPage(true);
        search(q, result?.nextPageToken)
        .then((res) => {
            setResult(res);
        })
        .catch((err) => {
            message.error("Erro");
        })
        .finally(() => {
            setLoadingNextPage(false);
        })
    }

    const displayThumb = (videoId: string, alt: string) => {
        let imgSize: string;
        const img = new Image();
        img.className = 'thumbnail';

        imgSize = 'maxresdefault';
        img.src = `${thumbnailApi.defaults.baseURL}/${videoId}/${imgSize}.jpg`;

        // verificar se a imagem recebida é a thumbnail de 404 e então substituir pela hq
        /* img.onload = () => {
            if(img.width === 120) {
                imgSize = 'sddefault';
            }
            if(imgSize !== 'maxresdefault') {
                img.src = `${thumbnailApi.defaults.baseURL}/${videoId}/${imgSize}.jpg`;
                
            }
        } */


        return <img src={img.src} className={img.className} alt={alt}/>;
    }

    return(
        <Spin spinning={loading}>
            {
            result && result.items.length > 0 ?
                <Row justify='center' style={{marginTop: '24px'}}>
                    <Col span={20}>
                        <Row align='top' justify='space-around' gutter={24}>
                            {
                            result.items.map(element => {
                                return(
                                    <Col xs={24} sm={8} md={8} lg={6}>
                                        <Link to={`/video/${element.videoId}`}  style={{display: 'flex', flexDirection: 'column'}}>
                                            <div className={'thumbnail-container'}>
                                                {displayThumb(element.videoId, element.title)}
                                            </div>
                                            <Text strong>{element.title}</Text>
                                            <Text>
                                                {element.channelTitle}
                                            </Text>
                                            <Text>
                                                {element.description}
                                            </Text>
                                        </Link>
                                    </Col>
                                )
                            })
                            }
                        </Row>
                        <Row>
                            <Spin spinning={loadingNextPage}>
                                <Row align='middle' justify='center'>
                                    Carregando mais resultados...
                                </Row>
                            </Spin>
                        </Row>
                    </Col>
                </Row>
            : 
                loading ? null : <ErrorMessage />
            }
        </Spin>
    );
}