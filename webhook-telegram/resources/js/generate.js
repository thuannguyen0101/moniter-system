// JSON data
const data = {
    "panels": [{
        "collapsed": false, "gridPos": {
            "h": 1, "w": 24, "x": 0, "y": 22
        }, "id": 200, "panels": [], "title": "Resource Details: 【$show_hostname】", "type": "row"
    }, {
        "datasource": {
            "type": "prometheus", "uid": "PA8B8139C6A4A2713"
        }, "description": "", "fieldConfig": {
            "defaults": {
                "decimals": 0, "mappings": [{
                    "options": {
                        "match": "null", "result": {
                            "text": "N/A"
                        }
                    }, "type": "special"
                }], "thresholds": {
                    "mode": "absolute", "steps": [{
                        "color": "rgba(245, 54, 54, 0.9)", "value": null
                    }, {
                        "color": "rgba(237, 129, 40, 0.89)", "value": 1
                    }, {
                        "color": "rgba(50, 172, 45, 0.97)", "value": 3
                    }]
                }, "unit": "s"
            }, "overrides": []
        }, "gridPos": {
            "h": 2, "w": 2, "x": 0, "y": 23
        }, "hideTimeOverride": true, "id": 201, "maxDataPoints": 100, "options": {
            "colorMode": "value",
            "graphMode": "none",
            "justifyMode": "auto",
            "orientation": "horizontal",
            "percentChangeColorMode": "standard",
            "reduceOptions": {
                "calcs": ["lastNotNull"], "fields": "", "values": false
            },
            "showPercentChange": false,
            "textMode": "auto",
            "wideLayout": true
        }, "pluginVersion": "11.1.3", "targets": [{
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "avg(time() - node_boot_time_seconds{instance=~\"$node\"})",
            "format": "time_series",
            "hide": false,
            "instant": true,
            "interval": "",
            "intervalFactor": 1,
            "legendFormat": "",
            "refId": "A",
            "step": 40
        }], "title": "Uptime", "type": "stat"
    }, {
        "datasource": {
            "type": "prometheus", "uid": "PA8B8139C6A4A2713"
        }, "fieldConfig": {
            "defaults": {
                "color": {
                    "mode": "thresholds"
                }, "decimals": 1, "mappings": [{
                    "options": {
                        "0": {
                            "text": "N/A"
                        }
                    }, "type": "value"
                }], "max": 100, "min": 0.1, "thresholds": {
                    "mode": "absolute", "steps": [{
                        "color": "green", "value": null
                    }, {
                        "color": "#EAB839", "value": 70
                    }, {
                        "color": "red", "value": 90
                    }]
                }, "unit": "percent"
            }, "overrides": []
        }, "gridPos": {
            "h": 6, "w": 3, "x": 2, "y": 23
        }, "id": 202, "options": {
            "displayMode": "lcd",
            "maxVizHeight": 300,
            "minVizHeight": 16,
            "minVizWidth": 8,
            "namePlacement": "auto",
            "orientation": "horizontal",
            "reduceOptions": {
                "calcs": ["last"], "fields": "", "values": false
            },
            "showUnfilled": true,
            "sizing": "auto",
            "valueMode": "color"
        }, "pluginVersion": "11.1.3", "targets": [{
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "100 - (avg(rate(node_cpu_seconds_total{instance=~\"$node\",mode=\"idle\"}[$interval])) * 100)",
            "instant": true,
            "interval": "",
            "legendFormat": "CPU Busy",
            "refId": "A"
        }, {
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "avg(rate(node_cpu_seconds_total{instance=~\"$node\",mode=\"iowait\"}[$interval])) * 100",
            "hide": true,
            "instant": true,
            "interval": "",
            "legendFormat": "IOwait使用率",
            "refId": "C"
        }, {
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "(1 - (node_memory_MemAvailable_bytes{instance=~\"$node\"} / (node_memory_MemTotal_bytes{instance=~\"$node\"})))* 100",
            "instant": true,
            "interval": "",
            "legendFormat": "Used RAM Memory",
            "refId": "B"
        }, {
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "(node_filesystem_size_bytes{instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint=\"$maxmount\"}-node_filesystem_free_bytes{instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint=\"$maxmount\"})*100 /(node_filesystem_avail_bytes {instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint=\"$maxmount\"}+(node_filesystem_size_bytes{instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint=\"$maxmount\"}-node_filesystem_free_bytes{instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint=\"$maxmount\"}))",
            "hide": false,
            "instant": true,
            "interval": "",
            "legendFormat": "Used Max Mount($maxmount)",
            "refId": "D"
        }, {
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "(1 - ((node_memory_SwapFree_bytes{instance=~\"$node\"} + 1)/ (node_memory_SwapTotal_bytes{instance=~\"$node\"} + 1))) * 100",
            "instant": true,
            "interval": "",
            "legendFormat": "Used SWAP",
            "refId": "F"
        }], "type": "bargauge"
    }, {
        "datasource": {
            "type": "prometheus", "uid": "PA8B8139C6A4A2713"
        },
        "description": "In this kanban: the total disk, usage, available, and usage rate are consistent with the values of the Size, Used, Avail, and Use% columns of the df command, and the value of Use% will be rounded to one decimal place, which will be more accurate .\n\nNote: The Use% algorithm in df is: (size-free) * 100 / (avail + (size-free)), the result is divisible by this value, non-divisible by this value is +1, and the unit of the result is %.\nRefer to the df command source code:",
        "fieldConfig": {
            "defaults": {
                "custom": {
                    "align": "auto", "cellOptions": {
                        "type": "auto"
                    }, "inspect": false
                }, "decimals": 2, "displayName": "", "mappings": [], "thresholds": {
                    "mode": "absolute", "steps": [{
                        "color": "green", "value": null
                    }, {
                        "color": "red", "value": 80
                    }]
                }, "unit": "short"
            }, "overrides": [{
                "matcher": {
                    "id": "byName", "options": "mountpoint"
                }, "properties": [{
                    "id": "displayName", "value": "Mounted on"
                }, {
                    "id": "unit", "value": "bytes"
                }, {
                    "id": "decimals", "value": 2
                }, {
                    "id": "custom.align"
                }, {
                    "id": "thresholds", "value": {
                        "mode": "absolute", "steps": [{
                            "color": "rgba(50, 172, 45, 0.97)", "value": null
                        }, {
                            "color": "rgba(237, 129, 40, 0.89)"
                        }]
                    }
                }]
            }, {
                "matcher": {
                    "id": "byName", "options": "Value #A"
                }, "properties": [{
                    "id": "displayName", "value": "Avail"
                }, {
                    "id": "unit", "value": "bytes"
                }, {
                    "id": "decimals", "value": 1
                }, {
                    "id": "custom.cellOptions", "value": {
                        "type": "color-text"
                    }
                }, {
                    "id": "custom.align"
                }, {
                    "id": "thresholds", "value": {
                        "mode": "absolute", "steps": [{
                            "color": "rgba(245, 54, 54, 0.9)", "value": null
                        }, {
                            "color": "rgba(237, 129, 40, 0.89)", "value": 10000000000
                        }, {
                            "color": "rgba(50, 172, 45, 0.97)", "value": 20000000000
                        }]
                    }
                }]
            }, {
                "matcher": {
                    "id": "byName", "options": "Value #B"
                }, "properties": [{
                    "id": "displayName", "value": "Used"
                }, {
                    "id": "unit", "value": "percent"
                }, {
                    "id": "decimals", "value": 1
                }, {
                    "id": "custom.cellOptions", "value": {
                        "type": "color-background"
                    }
                }, {
                    "id": "custom.align"
                }, {
                    "id": "thresholds", "value": {
                        "mode": "absolute", "steps": [{
                            "color": "rgba(50, 172, 45, 0.97)", "value": null
                        }, {
                            "color": "rgba(237, 129, 40, 0.89)", "value": 70
                        }, {
                            "color": "rgba(245, 54, 54, 0.9)", "value": 85
                        }]
                    }
                }]
            }, {
                "matcher": {
                    "id": "byName", "options": "Value #C"
                }, "properties": [{
                    "id": "displayName", "value": "Size"
                }, {
                    "id": "unit", "value": "bytes"
                }, {
                    "id": "custom.align"
                }]
            }, {
                "matcher": {
                    "id": "byName", "options": "fstype"
                }, "properties": [{
                    "id": "displayName", "value": "Filesystem"
                }, {
                    "id": "unit", "value": "short"
                }, {
                    "id": "decimals", "value": 2
                }, {
                    "id": "custom.align"
                }]
            }, {
                "matcher": {
                    "id": "byName", "options": "device"
                }, "properties": [{
                    "id": "displayName", "value": "Device"
                }, {
                    "id": "unit", "value": "short"
                }, {
                    "id": "decimals", "value": 2
                }, {
                    "id": "custom.align"
                }]
            }]
        },
        "gridPos": {
            "h": 6, "w": 10, "x": 5, "y": 23
        },
        "id": 203,
        "links": [{
            "targetBlank": true,
            "title": "https://github.com/coreutils/coreutils/blob/master/src/df.c",
            "url": "https://github.com/coreutils/coreutils/blob/master/src/df.c"
        }],
        "options": {
            "cellHeight": "sm", "footer": {
                "countRows": false, "fields": "", "reducer": ["sum"], "show": false
            }, "showHeader": true
        },
        "pluginVersion": "11.1.3",
        "targets": [{
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "node_filesystem_size_bytes{instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint !~\".*pod.*\"}-0",
            "format": "table",
            "hide": false,
            "instant": true,
            "interval": "",
            "intervalFactor": 1,
            "legendFormat": "总量",
            "refId": "C"
        }, {
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "node_filesystem_avail_bytes {instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint !~\".*pod.*\"}-0",
            "format": "table",
            "hide": false,
            "instant": true,
            "interval": "10s",
            "intervalFactor": 1,
            "legendFormat": "",
            "refId": "A"
        }, {
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "(node_filesystem_size_bytes{instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint !~\".*pod.*\"}-node_filesystem_free_bytes{instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint !~\".*pod.*\"}) *100/(node_filesystem_avail_bytes {instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint !~\".*pod.*\"}+(node_filesystem_size_bytes{instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint !~\".*pod.*\"}-node_filesystem_free_bytes{instance=~'$node',fstype=~\"ext.*|xfs\",mountpoint !~\".*pod.*\"}))",
            "format": "table",
            "hide": false,
            "instant": true,
            "interval": "",
            "intervalFactor": 1,
            "legendFormat": "",
            "refId": "B"
        }],
        "title": "【$show_hostname】：Disk Space Used Basic(EXT?/XFS)",
        "transformations": [{
            "id": "merge", "options": {
                "reducers": []
            }
        }, {
            "id": "organize", "options": {
                "excludeByName": {
                    "Time": true, "device": true, "fstype": true, "job": true
                }, "includeByName": {}, "indexByName": {}, "renameByName": {}
            }
        }],
        "type": "table"
    }, {
        "datasource": {
            "type": "prometheus", "uid": "PA8B8139C6A4A2713"
        }, "description": "", "fieldConfig": {
            "defaults": {
                "decimals": 2, "mappings": [{
                    "options": {
                        "match": "null", "result": {
                            "text": "N/A"
                        }
                    }, "type": "special"
                }], "max": 100, "min": 0, "thresholds": {
                    "mode": "absolute", "steps": [{
                        "color": "rgba(50, 172, 45, 0.97)", "value": null
                    }, {
                        "color": "rgba(237, 129, 40, 0.89)", "value": 20
                    }, {
                        "color": "#d44a3a", "value": 50
                    }]
                }, "unit": "percent"
            }, "overrides": []
        }, "gridPos": {
            "h": 2, "w": 2, "x": 15, "y": 23
        }, "id": 204, "maxDataPoints": 100, "options": {
            "colorMode": "value",
            "graphMode": "area",
            "justifyMode": "auto",
            "orientation": "horizontal",
            "percentChangeColorMode": "standard",
            "reduceOptions": {
                "calcs": ["last"], "fields": "", "values": false
            },
            "showPercentChange": false,
            "textMode": "auto",
            "wideLayout": true
        }, "pluginVersion": "11.1.3", "targets": [{
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "avg(rate(node_cpu_seconds_total{instance=~\"$node\",mode=\"iowait\"}[$interval])) * 100",
            "format": "time_series",
            "hide": false,
            "instant": false,
            "interval": "",
            "intervalFactor": 1,
            "legendFormat": "",
            "refId": "A",
            "step": 20
        }], "title": "CPU iowait", "type": "stat"
    }, {
        "datasource": {
            "type": "prometheus", "uid": "PA8B8139C6A4A2713"
        }, "fieldConfig": {
            "defaults": {
                "color": {
                    "mode": "palette-classic"
                }, "custom": {
                    "axisBorderShow": false,
                    "axisCenteredZero": false,
                    "axisColorMode": "text",
                    "axisLabel": "transmit（-）/receive（+）",
                    "axisPlacement": "auto",
                    "barAlignment": 0,
                    "drawStyle": "bars",
                    "fillOpacity": 100,
                    "gradientMode": "none",
                    "hideFrom": {
                        "legend": false, "tooltip": false, "viz": false
                    },
                    "insertNulls": false,
                    "lineInterpolation": "linear",
                    "lineWidth": 2,
                    "pointSize": 5,
                    "scaleDistribution": {
                        "type": "linear"
                    },
                    "showPoints": "never",
                    "spanNulls": false,
                    "stacking": {
                        "group": "A", "mode": "none"
                    },
                    "thresholdsStyle": {
                        "mode": "off"
                    }
                }, "links": [], "mappings": [], "thresholds": {
                    "mode": "absolute", "steps": [{
                        "color": "green", "value": null
                    }, {
                        "color": "red", "value": 80
                    }]
                }, "unit": "bytes"
            }, "overrides": [{
                "matcher": {
                    "id": "byName", "options": "cn-shenzhen.i-wz9cq1dcb6zwc39ehw59_cni0_in"
                }, "properties": [{
                    "id": "color", "value": {
                        "fixedColor": "light-red", "mode": "fixed"
                    }
                }]
            }, {
                "matcher": {
                    "id": "byName", "options": "cn-shenzhen.i-wz9cq1dcb6zwc39ehw59_cni0_in下载"
                }, "properties": [{
                    "id": "color", "value": {
                        "fixedColor": "green", "mode": "fixed"
                    }
                }]
            }, {
                "matcher": {
                    "id": "byName", "options": "cn-shenzhen.i-wz9cq1dcb6zwc39ehw59_cni0_out上传"
                }, "properties": [{
                    "id": "color", "value": {
                        "fixedColor": "yellow", "mode": "fixed"
                    }
                }]
            }, {
                "matcher": {
                    "id": "byName", "options": "cn-shenzhen.i-wz9cq1dcb6zwc39ehw59_eth0_in下载"
                }, "properties": [{
                    "id": "color", "value": {
                        "fixedColor": "purple", "mode": "fixed"
                    }
                }]
            }, {
                "matcher": {
                    "id": "byName", "options": "cn-shenzhen.i-wz9cq1dcb6zwc39ehw59_eth0_out"
                }, "properties": [{
                    "id": "color", "value": {
                        "fixedColor": "purple", "mode": "fixed"
                    }
                }]
            }, {
                "matcher": {
                    "id": "byName", "options": "cn-shenzhen.i-wz9cq1dcb6zwc39ehw59_eth0_out上传"
                }, "properties": [{
                    "id": "color", "value": {
                        "fixedColor": "blue", "mode": "fixed"
                    }
                }]
            }, {
                "matcher": {
                    "id": "byRegexp", "options": "/.*_transmit$/"
                }, "properties": [{
                    "id": "custom.transform", "value": "negative-Y"
                }]
            }, {
                "matcher": {
                    "id": "byValue", "options": {
                        "op": "gte", "reducer": "allIsZero", "value": 0
                    }
                }, "properties": [{
                    "id": "custom.hideFrom", "value": {
                        "legend": true, "tooltip": true, "viz": false
                    }
                }]
            }, {
                "matcher": {
                    "id": "byValue", "options": {
                        "op": "gte", "reducer": "allIsNull", "value": 0
                    }
                }, "properties": [{
                    "id": "custom.hideFrom", "value": {
                        "legend": true, "tooltip": true, "viz": false
                    }
                }]
            }]
        }, "gridPos": {
            "h": 6, "w": 7, "x": 17, "y": 23
        }, "id": 210, "options": {
            "legend": {
                "calcs": ["mean", "lastNotNull", "max", "sum"],
                "displayMode": "list",
                "placement": "bottom",
                "showLegend": false
            }, "tooltip": {
                "mode": "multi", "sort": "none"
            }
        }, "pluginVersion": "7.2.0", "targets": [{
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "increase(node_network_receive_bytes_total{instance=~\"$node\",device=~\"$device\"}[60m])",
            "interval": "60m",
            "intervalFactor": 1,
            "legendFormat": "{{device}}_receive",
            "metric": "",
            "refId": "A",
            "step": 600,
            "target": ""
        }, {
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "increase(node_network_transmit_bytes_total{instance=~\"$node\",device=~\"$device\"}[60m])",
            "hide": false,
            "interval": "60m",
            "intervalFactor": 1,
            "legendFormat": "{{device}}_transmit",
            "refId": "B",
            "step": 600
        }], "title": "Internet traffic per hour $device", "type": "timeseries"
    }, {
        "datasource": {
            "type": "prometheus", "uid": "PA8B8139C6A4A2713"
        }, "gridPos": {
            "h": 2, "w": 2, "x": 0, "y": 39
        }, "id": 227, "title": "CPU Cores", "targets": [{
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "editorMode": "code",
            "expr": "count(node_cpu_seconds_total{instance=~\"$node\", mode='system'})",
            "format": "time_series",
            "instant": true,
            "interval": "",
            "intervalFactor": 1,
            "legendFormat": "",
            "refId": "A",
            "step": 20
        }], "options": {
            "reduceOptions": {
                "values": false, "calcs": ["lastNotNull"], "fields": ""
            },
            "orientation": "horizontal",
            "textMode": "value",
            "wideLayout": true,
            "colorMode": "value",
            "graphMode": "none",
            "justifyMode": "auto",
            "showPercentChange": false,
            "percentChangeColorMode": "standard"
        }, "fieldConfig": {
            "defaults": {
                "mappings": [{
                    "options": {
                        "match": "null", "result": {
                            "text": "N/A"
                        }
                    }, "type": "special"
                }], "thresholds": {
                    "mode": "absolute", "steps": [{
                        "color": "rgba(245, 54, 54, 0.9)", "value": null
                    }, {
                        "color": "rgba(237, 129, 40, 0.89)", "value": 1
                    }, {
                        "color": "rgba(50, 172, 45, 0.97)", "value": 2
                    }]
                }, "unit": "short"
            }, "overrides": []
        }, "maxDataPoints": 100, "pluginVersion": "11.1.3", "type": "stat", "description": ""
    }, {
        "datasource": {
            "type": "prometheus", "uid": "PA8B8139C6A4A2713"
        }, "description": "", "fieldConfig": {
            "defaults": {
                "mappings": [{
                    "options": {
                        "match": "null", "result": {
                            "text": "N/A"
                        }
                    }, "type": "special"
                }], "thresholds": {
                    "mode": "absolute", "steps": [{
                        "color": "rgba(245, 54, 54, 0.9)", "value": null
                    }, {
                        "color": "rgba(237, 129, 40, 0.89)", "value": 100000
                    }, {
                        "color": "rgba(50, 172, 45, 0.97)", "value": 1000000
                    }]
                }, "unit": "short"
            }, "overrides": []
        }, "gridPos": {
            "h": 2, "w": 2, "x": 15, "y": 25
        }, "id": 207, "maxDataPoints": 100, "options": {
            "colorMode": "value",
            "graphMode": "none",
            "justifyMode": "auto",
            "orientation": "horizontal",
            "percentChangeColorMode": "standard",
            "reduceOptions": {
                "calcs": ["lastNotNull"], "fields": "", "values": false
            },
            "showPercentChange": false,
            "textMode": "auto",
            "wideLayout": true
        }, "pluginVersion": "11.1.3", "targets": [{
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "avg(node_filesystem_files_free{instance=~\"$node\",mountpoint=\"$maxmount\",fstype=~\"ext.?|xfs\"})",
            "format": "time_series",
            "instant": true,
            "interval": "",
            "intervalFactor": 1,
            "legendFormat": "",
            "refId": "A",
            "step": 20
        }], "title": "Free inodes:$maxmount ", "type": "stat"
    }, {
        "datasource": {
            "type": "prometheus", "uid": "PA8B8139C6A4A2713"
        }, "description": "", "fieldConfig": {
            "defaults": {
                "decimals": 0, "mappings": [{
                    "options": {
                        "match": "null", "result": {
                            "text": "N/A"
                        }
                    }, "type": "special"
                }], "thresholds": {
                    "mode": "absolute", "steps": [{
                        "color": "rgba(245, 54, 54, 0.9)", "value": null
                    }, {
                        "color": "rgba(237, 129, 40, 0.89)", "value": 2
                    }, {
                        "color": "rgba(50, 172, 45, 0.97)", "value": 3
                    }]
                }, "unit": "bytes"
            }, "overrides": []
        }, "gridPos": {
            "h": 2, "w": 2, "x": 0, "y": 27
        }, "id": 208, "maxDataPoints": 100, "options": {
            "colorMode": "value",
            "graphMode": "none",
            "justifyMode": "auto",
            "orientation": "horizontal",
            "percentChangeColorMode": "standard",
            "reduceOptions": {
                "calcs": ["lastNotNull"], "fields": "", "values": false
            },
            "showPercentChange": false,
            "textMode": "auto",
            "wideLayout": true
        }, "pluginVersion": "11.1.3", "targets": [{
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "sum(node_memory_MemTotal_bytes{instance=~\"$node\"})",
            "format": "time_series",
            "instant": true,
            "interval": "",
            "intervalFactor": 1,
            "legendFormat": "{{instance}}",
            "refId": "A",
            "step": 20
        }], "title": "Total RAM", "type": "stat"
    }, {
        "datasource": {
            "type": "prometheus", "uid": "PA8B8139C6A4A2713"
        }, "description": "", "fieldConfig": {
            "defaults": {
                "mappings": [{
                    "options": {
                        "match": "null", "result": {
                            "text": "N/A"
                        }
                    }, "type": "special"
                }], "thresholds": {
                    "mode": "absolute", "steps": [{
                        "color": "rgba(245, 54, 54, 0.9)", "value": null
                    }, {
                        "color": "rgba(237, 129, 40, 0.89)", "value": 1024
                    }, {
                        "color": "rgba(50, 172, 45, 0.97)", "value": 10000
                    }]
                }, "unit": "locale"
            }, "overrides": []
        }, "gridPos": {
            "h": 2, "w": 2, "x": 15, "y": 27
        }, "id": 209, "maxDataPoints": 100, "options": {
            "colorMode": "value",
            "graphMode": "none",
            "justifyMode": "auto",
            "orientation": "horizontal",
            "percentChangeColorMode": "standard",
            "reduceOptions": {
                "calcs": ["lastNotNull"], "fields": "", "values": false
            },
            "showPercentChange": false,
            "textMode": "auto",
            "wideLayout": true
        }, "pluginVersion": "11.1.3", "targets": [{
            "datasource": {
                "type": "prometheus", "uid": "PA8B8139C6A4A2713"
            },
            "expr": "avg(node_filefd_maximum{instance=~\"$node\"})",
            "format": "time_series",
            "instant": true,
            "intervalFactor": 1,
            "legendFormat": "",
            "refId": "A",
            "step": 20
        }], "title": "Total filefd", "type": "stat"
    }]
};

$('#generate').click(function () {
    const id_number = $('#form-id_number').val();
    const instance = $('#form-ip_address').val();
    const dns = $('#form-dns').val()
    const col_span = $('#form-col_span').val()
    let id = parseInt(id_number)

    if (parseInt(col_span) > 0 && parseInt(id_number) > 0 && instance.length > 0 && dns.length > 0) {
        const firstItem = data.panels[0];
        firstItem.gridPos.y = parseInt(col_span) + 7

        data.panels.forEach((panel, index) => {
            if (index === 0) {
                panel.gridPos.y = parseInt(col_span) + 7
            } else if (index > 0 && index <= 5) {
                panel.gridPos.y = (parseInt(col_span) + 7) + 1
            } else if (index > 5 && index <= 7) {
                panel.gridPos.y = (parseInt(col_span) + 7) + 3
            } else {
                panel.gridPos.y = (parseInt(col_span) + 7) + 5
            }
            id = id + 1;
            panel.id = id
        })

        const text_change_ip = JSON.stringify(data).replace(/\$node/g, instance);
        const text_change_show_hostname = text_change_ip.replace(/\$show_hostname/g, dns)
        const new_data = JSON.parse(text_change_show_hostname);
        console.log(new_data)
        const jsonString = JSON.stringify(new_data, null, 4);

        $('#output').val(jsonString)
    } else {
        alert('nhập đầy đủ thông tin')
        console.log(parseInt(id_number))
        console.log(instance.length > 0)
        console.log(dns.length > 0)
    }
})






