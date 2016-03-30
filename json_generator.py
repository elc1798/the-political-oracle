import api_requester as areq

poll_results = {}
candidates = {}

def add_state(state):
    global poll_results
    global candidates
    for poll in areq.KNOWN_POLLS:
        if "2016" not in poll or "president" not in poll or "primary" not in poll:
            continue
        try:
            res = areq.results_of(state, poll)[0]
        except:
            continue
        for candidate in res.keys():
            if candidate not in poll_results:
                poll_results[candidate] = int(res[candidate])
            else:
                poll_results[candidate] += int(res[candidate])
            if candidate not in candidates:
                candidates[candidate] = { state : int(res[candidate]) }
            else:
                candidates[candidate][state] = int(res[candidate])

def add_all_states():
    for state in areq.STATES:
        add_state(state)

add_all_states()
print poll_results

f = open("data/poll_data.json", 'w')
f.write(str(poll_results))
f.close()

for candidate in candidates:
    f = open(candidate.lower().replace(" ", "_").replace("/", "_") + ".json", 'w')
    f.write(str(candidates[candidate]))
    f.close()

