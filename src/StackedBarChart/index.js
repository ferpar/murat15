import { select, axisBottom, axisLeft, scaleLinear, scaleBand, stack, max, stackOrderAscending } from "d3";
import React, { useEffect, useRef } from "react";
import useResizeObserver from "../ResizeObserver"

const StackedBarChart = ({ data, keys, colors }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        const svg = select(svgRef.current);
        const { width, height } = 
            dimensions || wrapperRef.current.getBoundingClientRect();

        const stackGenerator = stack()
        .keys(keys)
        .order(stackOrderAscending);
        const layers = stackGenerator(data);
        const extent = [0, max(layers, layer => max(layer, sequence => sequence[1]))]

        // scales
        const xScale = scaleBand()
            .domain(data.map( d => d.year))
            .range([0, width])
            .padding(0.25)

        const yScale = scaleLinear()
            .domain(extent)
            .range([height, 0]);

        //rendering
        svg
            .selectAll(".layer")
            .data(layers)
            .join("g")
            .attr("fill", layer => {
                return colors[layer.key];
            })
            .attr("class", "layer")
            .selectAll("rect")
            .data(layer => layer) //accessing data from layers
            .join("rect")
            .attr("x", sequence => {
                return xScale(sequence.data.year)
            })
            .attr("width", xScale.bandwidth())
            .attr("y", sequence => yScale(sequence[1]))
            .attr("height", sequence => yScale(sequence[0])- yScale(sequence[1]))

        
        // axes
        const xAxis = axisBottom(xScale);

        svg
            .select(".x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)

    
        const yAxis = axisLeft(yScale);

        svg
            .select(".y-axis")
            .call(yAxis)
    
    }, [colors, data, keys, dimensions])

    return (
        <React.Fragment>
            <div ref={wrapperRef} style={{ marginBottom: "2rem"}}>
                <svg ref={svgRef}>
                    <g className="x-axis"/>
                    <g className="y-axis"/>
                </svg>
            </div>
        </React.Fragment>
    );
}

export default StackedBarChart;