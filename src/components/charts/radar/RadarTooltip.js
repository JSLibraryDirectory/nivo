/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import { arc as d3Arc } from 'd3-shape'
import RadarTooltipItem from './RadarTooltipItem'

const RadarTooltip = ({
    data,
    keys,
    getIndex,
    colorByKey,
    radius,
    angleStep,
    theme,
    showTooltip,
    hideTooltip,
}) => {
    const arc = d3Arc().outerRadius(radius).innerRadius(0)

    const halfAngleStep = angleStep * 0.5
    let rootStartAngle = -halfAngleStep

    return (
        <g>
            {data.map((d, i) => {
                const index = getIndex(d)
                const startAngle = rootStartAngle
                const endAngle = startAngle + angleStep

                rootStartAngle += angleStep

                return (
                    <RadarTooltipItem
                        key={index}
                        datum={d}
                        keys={keys}
                        index={index}
                        colorByKey={colorByKey}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        radius={radius}
                        arcGenerator={arc}
                        theme={theme}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                    />
                )
            })}
        </g>
    )
}

RadarTooltip.propTypes = {
    data: PropTypes.array.isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    getIndex: PropTypes.func.isRequired,
    colorByKey: PropTypes.object.isRequired,

    radius: PropTypes.number.isRequired,
    angleStep: PropTypes.number.isRequired,

    theme: PropTypes.object.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

export default pure(RadarTooltip)
