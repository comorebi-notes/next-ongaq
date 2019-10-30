export default class Audios extends React.Component {
  state = {
    ongaq: null,
    loading: true,
    playing: false
  }
  componentDidMount() {
    // Ongaq JS
    const ongaq = new Ongaq({
      api_key: process.env.ongaqApiKey,
      volume: 40,
      bpm: 130,
      onReady: () => this.setState({ loading: false })
    })

    // Drums
    const drums = new Part({
      sound: 'small_cube_drums',
      measure: 2
    })
    drums.add(
      new Filter({
        key: 'kick',
        active: (beat) => beat % 8 === 0
      })
    )
    drums.add(
      new Filter({
        key: 'hihat',
        volume: 5,
        active: (beat) => beat % 2 === 0
      })
    )
    drums.add(
      new Filter({
        key: 'hihat',
        volume: 20,
        active: (beat, measure) => (beat === 0 && measure === 0) || (beat === 8 && measure === 0) || (beat === 14 && measure === 0) || (beat === 2 && measure === 1) || (beat === 8 && measure === 1)
      })
    )
    ongaq.add(drums)

    // Guitar
    const guitar = new Part({
      sound: 'jazz_guitar',
      measure: 4
    })
    guitar.add(
      new Filter({
        key: ['F2', 'C3', 'E3', 'A3'],
        length: 16,
        active: (beat, measure) => beat === 0 && measure === 0
      })
    )
    guitar.add(
      new Filter({
        key: ['D2#', 'C3#', 'F3#', 'A3'],
        length: 4,
        active: (beat, measure) => beat === 4 && measure === 1
      })
    )
    guitar.add(
      new Filter({
        key: ['C2#'],
        length: 4,
        active: (beat, measure) => beat === 12 && measure === 1
      })
    )
    guitar.add(
      new Filter({
        key: ['G2', 'D3', 'F3', 'A3#'],
        length: 16,
        active: (beat, measure) => beat === 0 && measure === 2
      })
    )
    guitar.add(
      new Filter({
        key: ['C3', 'D3', 'G3#', 'A3#'],
        length: 4,
        active: (beat, measure) => beat === 4 && measure === 3
      })
    )
    guitar.add(
      new Filter({
        key: ['C2'],
        length: 4,
        active: (beat, measure) => beat === 12 && measure === 3
      })
    )
    ongaq.add(guitar)

    // Bass
    const bass = new Part({
      sound: 'mono_bass',
      measure: 4
    })
    bass.add(
      new Filter({
        key: (beat, measure) => {
          switch(measure) {
            case 0:
              switch (beat) {
                case 0: return ['F1']
                case 8: return ['A1']
              }
              break;
            case 1:
              switch (beat) {
                case 0: return ['C2']
                case 8: return ['D2#']
              }
              break;
            case 2:
              switch (beat) {
                case 0: return ['G2']
                case 8: return ['D2']
              }
              break;
            case 3:
              switch (beat) {
                case 0: return ['A1#']
                case 8: return ['G1#']
              }
          }
        },
        length: 4,
        active: (beat, _) => beat % 8 === 0
      })
    )
    ongaq.add(bass)

    // Piano
    const piano = new Part({
      sound: 'my_piano',
      measure: 4
    })
    piano.add(
      new Filter({
        key: new Chord('FM9'),
        volume: 30,
        length: 16,
        active: (beat, measure) => beat === 0 && measure === 0
      })
    )
    piano.add(
      new Filter({
        key: new Chord('D#m7-5'),
        length: 4,
        active: (beat, measure) => beat === 4 && measure === 1
      })
    )
    piano.add(
      new Filter({
        key: new Chord('Gm9'),
        volume: 30,
        length: 16,
        active: (beat, measure) => beat === 0 && measure === 2
      })
    )
    piano.add(
      new Filter({
        key: new Chord('A#m7-5'),
        length: 4,
        active: (beat, measure) => beat === 4 && measure === 3
      })
    )
    ongaq.add(piano)

    // Piano
    const violin = new Part({
      sound: 'plain_keyboard',
      measure: 16
    })
    violin.add(
      new Filter({
        key: ['D4'],
        volume: 80,
        length: 8,
        active: (beat, measure) => beat === 8 && measure === 7
      })
    )
    violin.add(
      new Filter({
        key: ['C4', 'E4'],
        volume: 80,
        length: 32,
        active: (beat, measure) => beat === 0 && measure === 8
      })
    )
    violin.add(
      new Filter({
        key: ['G4'],
        volume: 80,
        length: 8,
        active: (beat, measure) => beat === 8 && measure === 11
      })
    )
    violin.add(
      new Filter({
        key: ['E4'],
        volume: 80,
        length: 32,
        active: (beat, measure) => beat === 0 && measure === 12
      })
    )
    violin.add(
      new Filter({
        key: ['C4'],
        volume: 80,
        length: 32,
        active: (beat, measure) => beat === 12 && measure === 12
      })
    )
    violin.add(
      new Filter({
        key: ['G3'],
        volume: 80,
        length: 32,
        active: (beat, measure) => beat === 12 && measure === 14
      })
    )
    violin.add(
      new Filter({
        key: ['C4'],
        volume: 80,
        length: 16,
        active: (beat, measure) => beat === 0 && measure === 15
      })
    )
    ongaq.add(violin)

    this.setState({ ongaq })
  }
  handleClick = () => {
    const { ongaq } = this.state
    if (ongaq.params.isPlaying) {
      ongaq.pause()
      this.setState({ playing: false })
    } else {
      ongaq.start()
      this.setState({ playing: true })
    }
  }

  render() {
    const { loading, playing } = this.state
    return (
      <div className="mb-4">
        {loading ? (
          <span className="btn btn-secondary disabled">
            <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true" />
            Loading...
          </span>
        ) : (
          <button
            type="button"
            className={`btn btn-lg btn-${playing ? 'secondary' : 'primary'}`}
            onClick={this.handleClick}
          >
          {playing ? (
            <>
              <i className="fa fa-pause fa-fw" /> 再生中
            </>
          ) : (
            <>
              <i className="fa fa-play fa-fw" /> 再生する
            </>
          )}
        </button>
        )}
      </div>
    )
  }
}
