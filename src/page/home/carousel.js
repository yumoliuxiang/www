import React from 'react';

(function() {
	var lastTime = 0;
    var vendors = ['webkit', 'moz'];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
        	clearTimeout(id);
        };
    }
})();

export default class Carousel extends React.Component {
	static defaultProps = {
		interval: 3000
	}

    constructor(props) {
        super(props);

        this.boxDom = null;
        this.innerDom = null;
		
        this.state = {};
    }

    componentDidMount = e=>{
        setTimeout(e=>{
    		requestAnimationFrame(this.run);	
    	}, this.props.interval)
    }

    run = e=>{
        if (this.boxDom.scrollTop >= this.innerDom.scrollHeight) {
        	this.boxDom.scrollTop = 0;
        } else {
        	this.boxDom.scrollTop++;
        }

        if (this.boxDom.scrollTop % 30) {
			requestAnimationFrame(this.run);
        } else {
        	setTimeout(e=>{
        		requestAnimationFrame(this.run);
	        }, this.props.interval);	
        }
    }

    renderBody() {
        let {data = []} = this.props;

        return (
            <div style={{width: '100%', height: '100%', overflow: 'hidden'}}
            	ref={dom=>this.boxDom = dom}>
                <div ref={dom=>this.innerDom = dom}>
                    {
                    	data.map((item, index)=>(
                    		<div style={{height: '30px', lineHeight:'30px'}} 
                    			className="marquee-vertical-txt" 
                    			key={index}>
                    			{item}
                    		</div>
                    	))
                    }
                </div>
                <div>
                    {
                    	data.map((item, index)=>(
                    		<div style={{height: '30px', lineHeight:'30px'}} 
                    			className="marquee-vertical-txt" 
                    			key={index}>
                    			{item}
                    		</div>
                    	))
                    }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{width: '100%', height: '30px', overflow: 'hidden'}}>
                {
                	this.renderBody()
                }
            </div>
        )
    }
}