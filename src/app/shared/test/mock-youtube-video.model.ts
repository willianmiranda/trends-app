export class MockYoutubeVideoModel {
  constructor(
    public id = 'test_id',
    public snippet = {
      title: 'test_title',
      thumbnails: {
        high: {
          url: 'test_url'
        }
      },
      publishedAt: Date.now()
    }
  ) {}
}
