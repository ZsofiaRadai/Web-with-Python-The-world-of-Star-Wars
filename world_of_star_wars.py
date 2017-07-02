from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def show_planets():
    return render_template('star_wars.html')


def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()
