import React from 'react';
import propTypes from 'prop-types';

class Loading extends React.Component {
  render() {
    const { TagName } = this.props;
    return (
      <div>
        <TagName className="loading">Carregando...</TagName>
      </div>
    );
  }
}

Loading.propTypes = {
  TagName: propTypes.string,
};

Loading.defaultProps = {
  TagName: 'p',
};

export default Loading;
