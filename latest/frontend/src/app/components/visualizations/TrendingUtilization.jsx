import React from 'react';

const mockImageUrls = [
  require('../../img/g1.png'),
  require('../../img/g2.png'),
  require('../../img/g3.png'),
  require('../../img/g4.png'),
  require('../../img/g5.png')
];

const TrendingUtilization = () => <section className="app-over">
  <article>
    <div className="left">
      <h4>Reported Availability</h4>

      <p>24%</p>
    </div>
    <div className="right">
      <img src={ mockImageUrls[0] } alt=""/>
    </div>
  </article>
  <article>
    <div className="left">
      <h4>Error Count</h4>

      <p>124</p>
    </div>
    <div className="right">
      <img src={ mockImageUrls[1] } alt=""/>
    </div>
  </article>
  <article>
    <div className="left">
      <h4>Deviation Errors</h4>

      <p>48%</p>
    </div>
    <div className="right">
      <img src={ mockImageUrls[2] } alt=""/>
    </div>
  </article>
  <article>
    <div className="left">
      <h4>Reported Availability</h4>

      <p>102</p>
    </div>
    <div className="right">
      <img src={ mockImageUrls[3] } alt=""/>
    </div>
  </article>
  <article className="label">
    <div className="left">
    </div>
    <div className="right">
      <img src={ mockImageUrls[4] } alt=""/>
    </div>
  </article>
</section>;

export default TrendingUtilization;
