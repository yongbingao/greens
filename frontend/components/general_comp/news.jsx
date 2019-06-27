import React from 'react';

class News extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const newsList = this.props.news.map((el, idx) => {
            return (
                <li key={`news-`.concat(idx)}>
                    <a target="_blank" href={el.url}>
                        <object className="logged-in-page-news-image" data={el.image} type="image/png">
                            <img className="logged-in-page-news-image" src={window.newsDefaultImgURL} alt="default-image"/>
                        </object>
                        <div className="logged-in-page-news-content">
                            <span className="logged-in-page-news-source">{el.source}</span>
                            <br/>
                            <span className="logged-in-page-news-headline">{el.headline}</span>
                        </div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="logged-in-page-news-list">
                {newsList}
            </ul>
        )
    }
}

export default News;