local utils = {}

function load_db(db_file)
    local open = io.open
    local file = open(db_file, "r")
    if not file then return nil end
    local json_str = file:read "*a"
    file:close()
    local json = require 'json'
    return json.decode(json_str)
end

function find_ranges(ints)
    table.sort(ints)
    local gaps = {}
    for i = 2, #ints, 1 do
        if ints[i] - ints[i-1] > 1 then
            table.insert(gaps, i)
        end
    end
    table.insert(gaps, #ints + 1)

    local ranges = {}
    prev = 1
    for _, curr in ipairs(gaps) do
        if curr - prev == 1 then
            table.insert(ranges, string.format("%d", ints[prev]))
        else
            table.insert(ranges, string.format("%d--%d", ints[prev], ints[curr-1]))
        end
        prev = curr
    end

    return ranges
end

function utils.load_db(val) return (load_db(val)) end
function utils.find_ranges(val) return (find_ranges(val)) end

return utils
