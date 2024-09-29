import React from 'react'

function RatingGraph() {
  return (
    <div>
      <h1>This is rating graph</h1>
      <div className="rating-history-block">
      
      <div className="resource_fields">
        <a href="/resource/codechef.com/" title="codechef.com" data-toggle="tooltip" data-placement="right">codechef</a>
        <div className="input-group input-group-sm">
          <select id="resource_2_fields" data-select2-id="resource_2_fields" tabindex="-1" className="select2-hidden-accessible" aria-hidden="true">
            <option data-select2-id="4"></option>
          <option value="is_user_premium" data-select2-id="5">is_user_premium</option><option value="n_solved" data-select2-id="6">n_solved</option><option value="new_rating" data-select2-id="7">new_rating</option><option value="old_rating" data-select2-id="8">old_rating</option><option value="penalty" data-select2-id="9">penalty</option><option value="place" data-select2-id="10">place</option><option value="rating_change" data-select2-id="11">rating_change</option><option value="score" data-select2-id="12">score</option></select><span className="select2 select2-container select2-container--bootstrap" dir="ltr" data-select2-id="13" style="width: 130.56px;"><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-resource_2_fields-container"><span className="select2-selection__rendered" id="select2-resource_2_fields-container" role="textbox" aria-readonly="true"><span className="select2-selection__placeholder">Select field</span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
        </div>
      </div>
      

      
      

      <div className="chart_range_selection_hint small text-muted invisible">
        *double click to previous zoom
        </div>
        <canvas id="resource_2_rating_overlay" class="chart_range_selection_overlay" width="832" height="250"></canvas>
        <canvas
            className="rating_history"
            id="resource_2_rating"
            width="1664"
            height="499"
            style={{
                display: 'block',
                boxSizing: 'border-box',
                height: '249.5px',
                width: '832px'
            }}
            data-host="codechef.com"
            data-pk="2"
            data-icon="img/resources/codechef_com.png"
            data-kind=""
            >
        </canvas>
    </div>
    </div>
  )
}

export default RatingGraph
