import api_requester as areq

poll_results = {}

def add_state(state):
    global poll_results
    for poll in areq.KNOWN_POLLS:
        if "president" not in poll or "primary" not in poll:
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

def add_all_states():
    for state in areq.STATES:
        add_state(state)

add_all_states()
print poll_results

