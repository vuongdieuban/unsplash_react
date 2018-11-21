import React from 'react';

const ListView = (props) => {
    const photos = props.photos;
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    {photos.map((photo) => {
                        return (
                            <div className='photo col-lg-4' key={photo.id}>
                                <span><img className="active-photo" src={photo.urls.full} alt={photo.id} /></span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ListView;