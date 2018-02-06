import React from 'react';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

// 如果不是使用 List.Item 作为 children


const date = [
    [
        {
            label: '2013',
            value: '2013',
        },
        {
            label: '2014',
            value: '2014',
        },
        {
            label: '2015',
            value: '2015',
        },
        {
            label: '2016',
            value: '2016',
        }
    ],
    
    [
        {
            label: '01',
            value: '01',
        },
        {
            label: '02',
            value: '02',
        },
        {
            label: '03',
            value: '03',
        },
        {
            label: '04',
            value: '04',
        }
    ],
  
    [
        {
            label: '01',
            value: '01',
        },
        {
            label: '02',
            value: '02',
        },
        {
            label: '03',
            value: '03',
        },
        {
            label: '04',
            value: '04',
        }
    ],
    [
        {
            label: '00',
            value: '00',
        },
        {
            label: '01',
            value: '01',
        },
        {
            label: '02',
            value: '02',
        }
    ],
    [
        {
            label: '00',
            value: '00',
        },
        {
            label: '01',
            value: '01',
        },
        {
            label: '02',
            value: '02',
        }
    ],
    [
        {
            label: '00',
            value: '00',
        },
        {
            label: '01',
            value: '01',
        },
        {
            label: '02',
            value: '02',
        }
    ],
    [
        {
            label: '00',
            value: '00',
        },
        {
            label: '01',
            value: '01',
        },
        {
            label: '02',
            value: '02',
        }
    ]
];

export default class Test extends React.Component {
    state = {
        sValue: ['2015', '01', '01', '00','00','00','00'],
    };
    spiltDate(date){
        let a = date[0]+'-'+date[1]+'-'+date[2]+' ';
        let b = date[3]+':'+date[4]+'-'+date[5]+':'+date[6];
        let c = a + b; 
        return c;
    }
    render() {
        return (<div>
            <Picker
                data={date}
                title="选择时间段"
                cascade={false}
                extra=""
                value={this.state.sValue}
                onChange={v => this.setState({ sValue: v })}
                onOk={(v) => {this.setState({ sValue: v }),console.log(this.spiltDate(v));}}
            >
                <List.Item arrow="horizontal">Multiple</List.Item>
            </Picker>
        </div>);
    }
}
