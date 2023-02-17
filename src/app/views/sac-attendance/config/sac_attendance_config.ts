export const config = {
    sac_average_attendance_compliance: {
        "label": "Student Attendance Compliance",
        "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, state_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id ,state_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_state",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_state where date between startDate and endDate"
        },
        "timeSeriesQueries": {
            "table": "select state_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id where date between startDate and endDate group by t.state_id ,state_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_state  where date between startDate and endDate",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_state where date between startDate and endDate"
        },
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "timeSeriesQueries": {
                    "table": "select district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where (date between startDate and endDate) and m.state_id={state_id} group by t.district_id ,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id where (date between startDate and endDate) and m.state_id={state_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id where (date between startDate and endDate) and m.state_id={state_id}"
                },
                "query": "select t.state_id, state_name from ingestion.sac_stds_atd_cmp_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id,state_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id where m.state_id = {state_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id where (date between startDate and endDate) and m.state_id={state_id}"
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "timeSeriesQueries": {
                    "table": "select block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id} group by t.block_id,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
                },
                "query": "select t.district_id, district_name from ingestion.sac_stds_atd_cmp_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join ingestion.dimension_master as m on m.district_id = t.district_id where m.state_id={state_id} group by t.district_id,district_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "table": "select cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
                },
                "query": "select t.block_id, block_name from ingestion.sac_stds_atd_cmp_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join dimension_master as m on m.block_id = t.block_id where m.district_id = {district_id} group by t.block_id,block_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "timeSeriesQueries": {
                    "table": "select school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                },
                "query": "select t.cluster_id, cluster_name from ingestion.sac_stds_atd_cmp_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id} group by t.cluster_id,cluster_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where m.cluster_id={cluster_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "State",
                        property: "state_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "District",
                        property: "district_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Block",
                        property: "block_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "School",
                        property: "school_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Grade",
                        property: "grade",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Student Attendance Complaince",
                        property: "percentage",
                        sticky: true,
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#D6FFD6",
                                    breakPoint: 75
                                },
                                {
                                    color: "#FFFBD6",
                                    breakPoint: 50
                                },
                                {
                                    color: "#FFD6D6",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "state_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },
    sas_average_attendance: {
        "label": "Student Attendance Summary",
        "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, state_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id ,state_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_state",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_state where date between startDate and endDate"
        },
        "timeSeriesQueries": {
            "table": "select state_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id where date between startDate and endDate group by t.state_id ,state_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_state  where date between startDate and endDate",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_state where date between startDate and endDate"
        },
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "timeSeriesQueries": {
                    "table": "select district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where (date between startDate and endDate) and m.state_id={state_id} group by t.district_id ,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id where (date between startDate and endDate) and m.state_id={state_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id where (date between startDate and endDate) and m.state_id={state_id}"
                },
                "query": "select t.state_id, state_name from ingestion.sac_stds_avg_atd_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id,state_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where m.state_id = {state_id} group by t.district_id ,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id where m.state_id = {state_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id where (date between startDate and endDate) and m.state_id={state_id}"
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "timeSeriesQueries": {
                    "table": "select block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id} group by t.block_id,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
                },
                "query": "select t.district_id, district_name from ingestion.sac_stds_avg_atd_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join ingestion.dimension_master as m on m.district_id = t.district_id where m.state_id={state_id} group by t.district_id,district_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "table": "select cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
                },
                "query": "select t.block_id, block_name from ingestion.sac_stds_avg_atd_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_master as m on m.block_id = t.block_id where m.district_id = {district_id} group by t.block_id,block_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "timeSeriesQueries": {
                    "table": "select school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                },
                "query": "select t.cluster_id, cluster_name from ingestion.sac_stds_avg_atd_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id} group by t.cluster_id,cluster_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where m.cluster_id={cluster_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "State",
                        property: "state_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "District",
                        property: "district_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Block",
                        property: "block_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "School",
                        property: "school_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Grade",
                        property: "grade",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Student Attendance Complaince",
                        property: "percentage",
                        sticky: true,
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#D6FFD6",
                                    breakPoint: 75
                                },
                                {
                                    color: "#FFFBD6",
                                    breakPoint: 50
                                },
                                {
                                    color: "#FFD6D6",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "state_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },
    tas_average_teacher_attendance_summary: {
        "label": "Teacher Attendance Summary",
        "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, state_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id ,state_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_state",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_state where date between startDate and endDate"
        },
        "timeSeriesQueries": {
            "table": "select state_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id where date between startDate and endDate group by t.state_id ,state_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_state  where date between startDate and endDate",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_state where date between startDate and endDate"
        },
        "defaultLevel": "block",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "2",
                "timeSeriesQueries": {
                    "table": "select district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where date between startDate and endDate group by t.district_id ,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_district where date between startDate and endDate",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_district where date between startDate and endDate"
                },
                "query": "select t.state_id, state_name from ingestion.sac_tchs_avg_atd_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id,state_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id group by t.district_id ,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_district",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_district where (date between startDate and endDate) and "
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "table": "select block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id} group by t.block_id,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
                },
                "query": "select t.district_id, district_name from ingestion.sac_tchs_avg_atd_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join ingestion.dimension_master as m on m.district_id = t.district_id where m.state_id={state_id} group by t.district_id,district_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "table": "select cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
                },
                "query": "select t.block_id, block_name from ingestion.sac_tchs_avg_atd_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_master as m on m.block_id = t.block_id where m.district_id = {district_id} group by t.block_id,block_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "timeSeriesQueries": {
                    "table": "select school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                },
                "query": "select t.cluster_id, cluster_name from ingestion.sac_tchs_avg_atd_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id} group by t.cluster_id,cluster_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where m.cluster_id={cluster_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_avg_atd_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "State",
                        property: "state_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "District",
                        property: "district_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Block",
                        property: "block_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "School",
                        property: "school_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Grade",
                        property: "grade",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Teacher Attendance Summary",
                        property: "percentage",
                        sticky: true,
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#D6FFD6",
                                    breakPoint: 75
                                },
                                {
                                    color: "#FFFBD6",
                                    breakPoint: 50
                                },
                                {
                                    color: "#FFD6D6",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "state_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },
    tac_average_teacher_attendance_compliance: {
        "label": "Teacher Attendance Compliance",
        "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, state_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id ,state_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_state",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_state where date between startDate and endDate"
        },
        "timeSeriesQueries": {
            "table": "select state_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id where date between startDate and endDate group by t.state_id ,state_name",
            "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_state  where date between startDate and endDate",
            "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_state where date between startDate and endDate"
        },
        "defaultLevel": "block",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "2",
                "timeSeriesQueries": {
                    "table": "select district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id where date between startDate and endDate group by t.district_id ,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_district where date between startDate and endDate",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_district where date between startDate and endDate"
                },
                "query": "select t.state_id, state_name from ingestion.sac_tchs_atd_cmp_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id,state_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_district as d on t.district_id = d.district_id group by t.district_id ,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_district",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_district where (date between startDate and endDate) and "
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "table": "select block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id} group by t.block_id,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
                },
                "query": "select t.district_id, district_name from ingestion.sac_tchs_atd_cmp_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join ingestion.dimension_master as m on m.district_id = t.district_id where m.state_id={state_id} group by t.district_id,district_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id} group by t.block_id,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.district_id={district_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_block as t left join ingestion.dimension_master as m on t.block_id = m.block_id left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.district_id={district_id}"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "table": "select cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where (date between startDate and endDate) and m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
                },
                "query": "select t.block_id, block_name from ingestion.sac_tchs_atd_cmp_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_master as m on m.block_id = t.block_id where m.district_id = {district_id} group by t.block_id,block_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_block as b on m.block_id = b.block_id left join ingestion.dimension_district as d on m.district_id = d.district_id where m.block_id={block_id} group by t.cluster_id,cluster_name,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_cluster as t left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id}"
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "timeSeriesQueries": {
                    "table": "select school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                    "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                    "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                },
                "query": "select t.cluster_id, cluster_name from ingestion.sac_tchs_atd_cmp_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id} group by t.cluster_id,cluster_name",
                "actions": {
                    "queries": {
                        "table": "select min(date) as min_date, max(date) as max_date, school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
                        "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where m.cluster_id={cluster_id}",
                        "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
                    },
                    "level": "school"
                }
            },
            // {
            //   "name": "School",
            //   "labelProp": "school_name",
            //   "valueProp": "school_id",
            //   "hierarchyLevel": "5",
            //   "timeSeriesQueries": {
            //     "table": "select school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name ",
            //     "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
            //     "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
            //   },
            //   "query": "select t.cluster_id, cluster_name from ingestion.sac_tchs_atd_cmp_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id} group by t.cluster_id,cluster_name",
            //   "actions": {
            //     "queries": {
            //       "table": "select school_name, cluster_name, block_name, district_name, round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id left join ingestion.dimension_district as d on d.district_id = m.district_id left join ingestion.dimension_block as b on b.block_id = m.block_id left join ingestion.dimension_cluster as c on c.cluster_id = m.cluster_id left join ingestion.dimension_school as s on s.school_id = t.school_id where m.cluster_id={cluster_id} group by school_name,cluster_name,block_name,district_name",
            //       "bigNumber": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where m.cluster_id={cluster_id}",
            //       "bigNumberComparison": "select round(avg(percentage),2) as percentage from ingestion.sac_tchs_atd_cmp_by_school as t left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id}",
            //     },
            //     "level": "school"
            //   }
            // }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "State",
                        property: "state_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "District",
                        property: "district_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Block",
                        property: "block_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "School",
                        property: "school_name",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Grade",
                        property: "grade",
                        sticky: true,
                        class: "text-center"
                    },
                    {
                        name: "Teacher Attendance Complaince",
                        property: "percentage",
                        sticky: true,
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#D6FFD6",
                                    breakPoint: 75
                                },
                                {
                                    color: "#FFFBD6",
                                    breakPoint: 50
                                },
                                {
                                    color: "#FFD6D6",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "state_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },
    sas_gender_wise_average_attendance: {
        "label": "Gender Wise Average Attendance",
        "queries": {
            "barChart": "select min(date) as min_date, max(date) as max_date, state_name as location,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_gender_wise_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id, state_name",
        },
        "timeSeriesQueries": {
            "barChart": "select state_name as location,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_gender_wise_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id where date between startDate and endDate group by t.state_id, state_name",
        },
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "query": "select t.state_id, state_name from ingestion.sac_stds_avg_atd_gender_wise_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id,state_name",
                "timeSeriesQueries": {
                    "barChart": "select district_name as location, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_gender_wise_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join ingestion.dimension_master as m on t.district_id = m.district_id where (date between startDate and endDate) and m.state_id={state_id} group by t.district_id,district_name",
                },
                "actions": {
                    "queries": {
                        "barChart": "select min(date) as min_date, max(date) as max_date, district_name as location, state_name,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_gender_wise_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_master as m on t.district_id = m.district_id where m.state_id={state_id} group by t.district_id,district_name",
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "timeSeriesQueries": {
                    "barChart": "select block_name as location, district_name, state_name,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_gender_wise_by_block as t left join ingestion.dimension_block as b on t.block_id = t2.block_id left join ingestion.dimension_master as m on t.block_id = m.block_id where (date between startDate and endDate) and m.district_id={district_id} group by t.block_id,block_name",
                },
                "query": "select t.district_id, district_name from ingestion.sac_stds_avg_atd_gender_wise_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join ingestion.dimension_master as m on t.district_id = m.district_id where m.state_id={state_id} group by t.district_id,district_name",
                "actions": {
                    "queries": {
                        "barChart": "select min(date) as min_date, max(date) as max_date, block_name as location,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_gender_wise_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_master as m on t.block_id = m.block_id where m.district_id={district_id} group by t.block_id,block_name",
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "barChart": "select cluster_name as location, block_name, district_name, state_name,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_gender_wise_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id} group by t.cluster_id,cluster_name",
                },
                "query": "select t.block_id, block_name from ingestion.sac_stds_avg_atd_gender_wise_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_master as m on t.block_id = m.block_id where m.district_id={district_id} group by t.block_id,block_name",
                "actions": {
                    "queries": {
                        "barChart": "select min(date) as min_date, max(date) as max_date, cluster_name as location, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_gender_wise_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id} group by t.cluster_id,cluster_name",
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "timeSeriesQueries": {
                    "barChart": "select school_name as location, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_gender_wise_by_school as t left join ingestion.dimension_school as s on t.school_id = s.school_id left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id} group by t.school_id,school_name",
                },
                "query": "select t.cluster_id, cluster_name from ingestion.sac_stds_avg_atd_gender_wise_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id} group by t.cluster_id,cluster_name",
                "actions": {
                    "queries": {
                        "barChart": "select min(date) as min_date, max(date) as max_date, school_name as location, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_gender_wise_by_school as t left join ingestion.dimension_school as s on t.school_id = s.school_id left join ingestion.dimension_master as m on t.school_id = m.school_id where m.cluster_id={cluster_id} group by t.school_id,school_name",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "barChart": {
                "yAxis": {
                    "title": "level",
                    "label": "location",
                    "value": "location"
                },
                "xAxis": {
                    "title": "Number",
                    "metrics": [
                        {
                            "label": "Average Percentage",
                            "value": "percentage"
                        }
                    ]
                }
            }
        }
    },
    sas_grade_wise_average_attendance: {
        "label": "Grade Wise Average Attendance",
        "queries": {
            "barChart": "select min(date) as min_date, max(date) as max_date, state_name as location,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_cat_wise_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id, state_name",
        },
        "timeSeriesQueries": {
            "barChart": "select state_name as location,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_cat_wise_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id where date between startDate and endDate group by t.state_id, state_name",
        },
        "defaultLevel": "state",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "query": "select t.state_id, state_name from ingestion.sac_stds_avg_atd_cat_wise_by_state as t left join ingestion.dimension_state as s on t.state_id = s.state_id group by t.state_id,state_name",
                "timeSeriesQueries": {
                    "barChart": "select district_name as location, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_cat_wise_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join ingestion.dimension_master as m on t.district_id = m.district_id where (date between startDate and endDate) and m.state_id={state_id} group by t.district_id,district_name",
                },
                "actions": {
                    "queries": {
                        "barChart": "select min(date) as min_date, max(date) as max_date, district_name as location, state_name,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_cat_wise_by_district as t left join ingestion.dimension_master as m on t.district_id = m.district_id left join ingestion.dimension_master as m on t.district_id = m.district_id where m.state_id={state_id} group by t.district_id,district_name",
                    },
                    "level": "district"
                }
            },
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "timeSeriesQueries": {
                    "barChart": "select block_name as location, district_name, state_name,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_cat_wise_by_block as t left join ingestion.dimension_block as b on t.block_id = t2.block_id left join ingestion.dimension_master as m on t.block_id = m.block_id where (date between startDate and endDate) and m.district_id={district_id} group by t.block_id,block_name",
                },
                "query": "select t.district_id, district_name from ingestion.sac_stds_avg_atd_cat_wise_by_district as t left join ingestion.dimension_district as d on t.district_id = d.district_id left join ingestion.dimension_master as m on t.district_id = m.district_id where m.state_id={state_id} group by t.district_id,district_name",
                "actions": {
                    "queries": {
                        "barChart": "select min(date) as min_date, max(date) as max_date, block_name as location,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_cat_wise_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_master as m on t.block_id = m.block_id where m.district_id={district_id} group by t.block_id,block_name",
                    },
                    "level": "block"
                }
            },
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "timeSeriesQueries": {
                    "barChart": "select cluster_name as location, block_name, district_name, state_name,round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_cat_wise_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where (date between startDate and endDate) and m.block_id={block_id} group by t.cluster_id,cluster_name",
                },
                "query": "select t.block_id, block_name from ingestion.sac_stds_avg_atd_cat_wise_by_block as t left join ingestion.dimension_block as b on t.block_id = b.block_id left join ingestion.dimension_master as m on t.block_id = m.block_id where m.district_id={district_id} group by t.block_id,block_name",
                "actions": {
                    "queries": {
                        "barChart": "select min(date) as min_date, max(date) as max_date, cluster_name as location, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_cat_wise_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id} group by t.cluster_id,cluster_name",
                    },
                    "level": "cluster"
                }
            },
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "timeSeriesQueries": {
                    "barChart": "select school_name as location, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_cat_wise_by_school as t left join ingestion.dimension_school as s on t.school_id = s.school_id left join ingestion.dimension_master as m on t.school_id = m.school_id where (date between startDate and endDate) and m.cluster_id={cluster_id} group by t.school_id,school_name",
                },
                "query": "select t.cluster_id, cluster_name from ingestion.sac_stds_avg_atd_cat_wise_by_cluster as t left join ingestion.dimension_cluster as c on t.cluster_id = c.cluster_id left join ingestion.dimension_master as m on t.cluster_id = m.cluster_id where m.block_id={block_id} group by t.cluster_id,cluster_name",
                "actions": {
                    "queries": {
                        "barChart": "select min(date) as min_date, max(date) as max_date, school_name as location, round(avg(percentage),2) as percentage from ingestion.sac_stds_avg_atd_cat_wise_by_school as t left join ingestion.dimension_school as s on t.school_id = s.school_id left join ingestion.dimension_master as m on t.school_id = m.school_id where m.cluster_id={cluster_id} group by t.school_id,school_name",
                    },
                    "level": "school"
                }
            }
        ],
        "options": {
            "barChart": {
                "yAxis": {
                    "title": "level",
                    "label": "location",
                    "value": "location"
                },
                "xAxis": {
                    "title": "Number",
                    "metrics": [
                        {
                            "label": "Average Percentage",
                            "value": "percentage"
                        }
                    ]
                }
            }
        }
    }
}

