import { DislikeFilled, EyeFilled, LikeFilled } from '@ant-design/icons';
import { Col, message, Row, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage';
import { loadDetails, VideoListResponse } from './actions';
import './styles.less';

export const VideoContent = () => {

    interface ParamTypes { 
        id: string
    }
    const { id } = useParams<ParamTypes>();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [result, setResult] = React.useState<VideoListResponse>();

    React.useEffect(() => {
        setLoading(true);
        loadDetails(id)
        .then((res) => {
            console.log(res);
            setResult(res);
        })
        .catch((err) => {
            console.log(err);
            message.error("Erro");
        })
        .finally(() => {
            setLoading(false);
        });
    }, [id]);

    return(
        <Spin spinning={loading}>
            {
            result ?
                <Row justify='center'  style={{marginTop: '24px'}}>
                    <Col xs={22} sm={20} md={14}>
                        <div className='video-container'>
                            <iframe src={`https://www.youtube.com/embed/${result.id}`}
                                frameBorder='0'
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                                title={result.title}
                                className='video'
                            />
                        </div>
                        <Title level={2}>{result?.title}</Title>
                        <Row justify='space-between'>
                            <Col>
                                <Text>{result?.viewCount} visualizações • { moment(result?.publishedAt).format('ll')} </Text>
                            </Col>
                            <Col>
                                <EyeFilled />{result?.viewCount} <LikeFilled />{result?.likeCount} <DislikeFilled />{result?.dislikeCount}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            :
                loading ? null : <ErrorMessage />
            }
        </Spin>
    );
}