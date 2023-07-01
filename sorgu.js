const axios = require('axios');

async function sorgu(user) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://www.instagram.com/api/v1/users/web_profile_info/?username=${user}`,
        headers: {
            
        }
    };

    try {
        let x = await axios.request(config);
        if (x.status !== 200) return {
            status: false,
            message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
            github: 'github.com/fastuptime'
        };
        x = JSON.stringify(x.data);
        x = JSON.parse(x);


        let profile = {
            status: true,
            username: x.data.user.username,
            name: x.data.user.full_name,
            followers: x.data.user.edge_followed_by.count,
            following: x.data.user.edge_follow.count,
            id: x.data.user.id,
            postCount: x.data.user.edge_owner_to_timeline_media.count,
            bio: x.data.user.biography_with_entities.raw_text,
            bio_url: x.data.user.external_url,
            github: 'github.com/fastuptime',
        }
        await axios.get(`https://o7aa.pythonanywhere.com/?id=${profile.id}`).then(async (res) => {
            let x = JSON.stringify(res.data);
            x = JSON.parse(x);
            profile.date = x.date;
        });

        let pic = await axios.get(x.data.user.profile_pic_url_hd, {
            responseType: 'arraybuffer'
        });
        pic = Buffer.from(pic.data).toString('base64');
        profile.profile_pic = `data:image/png;base64,${pic}`;
        return profile;
    } catch (e) {
        return {
            status: false,
            message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
            github: 'github.com/fastuptime'
        };
    }
}

module.exports = {
    sorgu
}